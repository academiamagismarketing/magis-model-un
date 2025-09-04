import React from 'react';

interface RichContentProps {
  content: string;
  className?: string;
}

const RichContent: React.FC<RichContentProps> = ({ content, className = '' }) => {
  // Função para processar o conteúdo HTML e adicionar classes CSS
  const processContent = (htmlContent: string) => {
    if (!htmlContent) return '';
    
    // Adicionar classes CSS para melhorar a formatação
    let processed = htmlContent
      // Headings
      .replace(/<h1>/g, '<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-8 leading-tight">')
      .replace(/<h2>/g, '<h2 class="text-2xl md:text-3xl font-bold text-foreground mb-5 mt-7 leading-tight">')
      .replace(/<h3>/g, '<h3 class="text-xl md:text-2xl font-semibold text-foreground mb-4 mt-6 leading-tight">')
      .replace(/<h4>/g, '<h4 class="text-lg md:text-xl font-semibold text-foreground mb-3 mt-5 leading-tight">')
      .replace(/<h5>/g, '<h5 class="text-base md:text-lg font-semibold text-foreground mb-3 mt-4 leading-tight">')
      .replace(/<h6>/g, '<h6 class="text-sm md:text-base font-semibold text-foreground mb-2 mt-3 leading-tight">')
      
      // Parágrafos
      .replace(/<p>/g, '<p class="text-base md:text-lg text-foreground mb-4 leading-relaxed">')
      
      // Listas
      .replace(/<ul>/g, '<ul class="list-disc list-inside text-base md:text-lg text-foreground mb-4 space-y-2 ml-4">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside text-base md:text-lg text-foreground mb-4 space-y-2 ml-4">')
      .replace(/<li>/g, '<li class="leading-relaxed">')
      
      // Links
      .replace(/<a /g, '<a class="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors" ')
      
      // Texto em negrito e itálico
      .replace(/<strong>/g, '<strong class="font-semibold text-foreground">')
      .replace(/<em>/g, '<em class="italic text-foreground">')
      
      // Citações
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary/30 pl-4 py-2 my-6 bg-muted/30 italic text-foreground">')
      
      // Código
      .replace(/<code>/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">')
      
      // Tabelas
      .replace(/<table>/g, '<table class="w-full border-collapse border border-border my-6 overflow-x-auto">')
      .replace(/<th>/g, '<th class="border border-border px-4 py-2 bg-muted font-semibold text-foreground text-left">')
      .replace(/<td>/g, '<td class="border border-border px-4 py-2 text-foreground">')
      
      // Imagens
      .replace(/<img /g, '<img class="w-full h-auto rounded-lg shadow-md my-6" loading="lazy" ');

    return processed;
  };

  return (
    <div 
      className={`rich-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
};

export default RichContent;
