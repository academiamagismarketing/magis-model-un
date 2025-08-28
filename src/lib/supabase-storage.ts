import { supabase } from './supabase';

// Função para fazer upload de uma imagem para o Supabase Storage
export const uploadImage = async (file: File, folder: 'events' | 'products'): Promise<string> => {
  // Gerar nome único para o arquivo
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  // Fazer upload do arquivo
  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }

  // Obter URL pública da imagem
  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

// Função para deletar uma imagem do Supabase Storage
export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!imageUrl || !imageUrl.includes('supabase')) {
    return; // Não é uma imagem do Supabase Storage
  }

  try {
    // Extrair o caminho do arquivo da URL
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split('/');
    const bucketIndex = pathSegments.findIndex(segment => segment === 'images');
    
    if (bucketIndex === -1) {
      return; // Não conseguiu encontrar o bucket
    }

    const filePath = pathSegments.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from('images')
      .remove([filePath]);

    if (error) {
      console.error('Erro ao deletar imagem:', error.message);
    }
  } catch (error) {
    console.error('Erro ao processar URL da imagem:', error);
  }
};

// Função auxiliar para validar arquivos de imagem
export const validateImageFile = (file: File): string | null => {
  // Verificar tipo de arquivo
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Apenas arquivos JPEG, PNG e WebP são permitidos.';
  }

  // Verificar tamanho do arquivo (máximo 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB em bytes
  if (file.size > maxSize) {
    return 'O arquivo deve ter no máximo 5MB.';
  }

  return null; // Arquivo válido
};