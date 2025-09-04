import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  url: string;
  type?: 'article' | 'website';
  category?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords,
  author = 'Academia MAGIS',
  publishedAt,
  imageUrl,
  url,
  type = 'article',
  category = 'Educação'
}) => {
  // Otimizar título para SEO acadêmico
  const seoTitle = `${title} | Academia MAGIS - Simulações & Mentorias Acadêmicas`;
  
  // Otimizar descrição para incluir palavras-chave acadêmicas
  const seoDescription = `${description} Descubra como participar de simulações acadêmicas, mentorias educacionais e atividades MUN na Academia MAGIS.`;
  
  // Expandir palavras-chave com termos relacionados
  const expandedKeywords = `${keywords}, simulações acadêmicas, mentorias educacionais, MUN, atividades extracurriculares, diplomacia, relações internacionais, academia MAGIS`;

  return (
    <Helmet>
      {/* Meta Tags Básicas */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={expandedKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content="Academia MAGIS" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? "Article" : "WebPage",
          "headline": title,
          "description": seoDescription,
          "image": imageUrl,
          "author": {
            "@type": "Organization",
            "name": author,
            "url": "https://academiamagis.com.br"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Academia MAGIS",
            "logo": {
              "@type": "ImageObject",
              "url": "https://academiamagis.com.br/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          },
          "datePublished": publishedAt,
          "dateModified": publishedAt,
          "keywords": expandedKeywords,
          "articleSection": category,
          "about": [
            "Simulações acadêmicas",
            "Mentorias educacionais", 
            "MUN - Model United Nations",
            "Diplomacia",
            "Relações internacionais",
            "Atividades extracurriculares"
          ],
          "audience": {
            "@type": "Audience",
            "audienceType": "Acadêmicos, estudantes, educadores"
          }
        })}
      </script>
      
      {/* Meta Tags Específicas para Educação */}
      <meta name="subject" content="Educação e Simulações Acadêmicas" />
      <meta name="classification" content="Educação Superior" />
      <meta name="coverage" content="Brasil" />
      <meta name="distribution" content="Global" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Hreflang para internacionalização */}
      <link rel="alternate" hrefLang="pt-BR" href={url} />
      <link rel="alternate" hrefLang="en" href={url.replace('/publicacoes/', '/publications/')} />
      
      {/* Preconnect para performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SeoHead;
