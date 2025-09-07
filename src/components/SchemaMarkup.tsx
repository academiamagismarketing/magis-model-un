import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schemas: any[];
}

/**
 * Componente para renderizar Schema.org Microdata
 * Melhora SEO e rich snippets nos resultados de busca
 */
const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schemas }) => {
  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </Helmet>
  );
};

export default SchemaMarkup;
