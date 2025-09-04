// ===== TESTAR CONEXÃO COM SUPABASE =====

// Este script pode ser executado no console do navegador para testar a conexão

console.log('=== TESTANDO CONEXÃO COM SUPABASE ===');

// 1. Verificar variáveis de ambiente
console.log('Variáveis de ambiente:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '***' : 'NÃO DEFINIDA');

// 2. Testar conexão básica
async function testConnection() {
  try {
    console.log('\n=== TESTE 1: Conexão básica ===');
    
    // Importar o cliente Supabase
    const { supabase } = await import('./src/lib/supabase.ts');
    
    console.log('Cliente Supabase criado:', !!supabase);
    
    // 3. Testar consulta simples
    console.log('\n=== TESTE 2: Consulta simples ===');
    const { data: simpleData, error: simpleError } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
    
    if (simpleError) {
      console.error('Erro na consulta simples:', simpleError);
    } else {
      console.log('Consulta simples bem-sucedida:', simpleData);
    }
    
    // 4. Testar contagem de posts
    console.log('\n=== TESTE 3: Contagem de posts ===');
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Erro na contagem:', countError);
    } else {
      console.log('Total de posts:', count);
    }
    
    // 5. Testar busca de posts publicados
    console.log('\n=== TESTE 4: Posts publicados ===');
    const { data: publishedPosts, error: publishedError } = await supabase
      .from('blog_posts')
      .select('id, title, status')
      .eq('status', 'published')
      .limit(5);
    
    if (publishedError) {
      console.error('Erro na busca de posts publicados:', publishedError);
    } else {
      console.log('Posts publicados encontrados:', publishedPosts?.length || 0);
      console.log('Primeiros posts:', publishedPosts);
    }
    
    // 6. Testar busca de todos os posts (admin)
    console.log('\n=== TESTE 5: Todos os posts (admin) ===');
    const { data: allPosts, error: allError } = await supabase
      .from('blog_posts')
      .select('id, title, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (allError) {
      console.error('Erro na busca de todos os posts:', allError);
    } else {
      console.log('Todos os posts encontrados:', allPosts?.length || 0);
      console.log('Primeiros posts:', allPosts);
    }
    
  } catch (error) {
    console.error('Erro geral no teste:', error);
  }
}

// Executar teste
testConnection();

// Função para testar manualmente
window.testSupabase = testConnection;
console.log('\nPara executar o teste novamente, use: testSupabase()');
