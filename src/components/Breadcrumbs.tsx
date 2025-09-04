import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav 
      className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home */}
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Página inicial"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      <ChevronRight className="w-4 h-4" />
      
      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.current ? (
            <span 
              className="text-foreground font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <>
              <Link
                to={item.href || '#'}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
              {index < items.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Componente específico para publicações
export const PublicationBreadcrumbs: React.FC<{ 
  category?: string; 
  title?: string;
  isArticle?: boolean;
}> = ({ category, title, isArticle = false }) => {
  const items: BreadcrumbItem[] = [
    {
      label: 'Publicações',
      href: '/publicacoes'
    }
  ];

  if (category) {
    items.push({
      label: category,
      href: `/publicacoes?categoria=${encodeURIComponent(category)}`
    });
  }

  if (title && isArticle) {
    items.push({
      label: title,
      current: true
    });
  }

  return <Breadcrumbs items={items} />;
};

export default Breadcrumbs;
