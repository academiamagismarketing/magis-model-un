/**
 * Utilitário para gerar Schema.org Microdata
 * Implementa structured data para melhor SEO e rich snippets
 */

export interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: {
    addressCountry: string;
    addressLocality?: string;
    addressRegion?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
  areaServed?: string;
}

export interface EventSchema {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
  };
  organizer: {
    name: string;
    url: string;
  };
  url?: string;
  image?: string;
  offers?: {
    price?: string;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
    validThrough?: string;
  };
  eventStatus: string;
  eventAttendanceMode: string;
  maximumAttendeeCapacity?: number;
  category?: string;
}

export interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand: {
    name: string;
  };
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
    seller: {
      name: string;
    };
  };
  category?: string;
  sku?: string;
}

export interface ArticleSchema {
  headline: string;
  description: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  datePublished: string;
  dateModified: string;
  image?: string;
  url: string;
  mainEntityOfPage: string;
}

export interface BreadcrumbSchema {
  itemListElement: Array<{
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQSchema {
  mainEntity: Array<{
    name: string;
    acceptedAnswer: {
      text: string;
    };
  }>;
}

/**
 * Gerar Schema.org para Organização
 */
export const generateOrganizationSchema = (data: OrganizationSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "logo": data.logo,
    "address": data.address ? {
      "@type": "PostalAddress",
      "addressCountry": data.address.addressCountry,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion
    } : undefined,
    "contactPoint": data.contactPoint ? {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "email": data.contactPoint.email,
      "contactType": data.contactPoint.contactType
    } : undefined,
    "sameAs": data.sameAs,
    "foundingDate": data.foundingDate,
    "numberOfEmployees": data.numberOfEmployees,
    "areaServed": data.areaServed,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Educacionais",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Simulações Temáticas",
            "description": "Simulações acadêmicas educacionais"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mentorias Acadêmicas",
            "description": "Mentorias gratuitas para desenvolvimento acadêmico"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workshops de Diplomacia",
            "description": "Workshops sobre diplomacia e relações internacionais"
          }
        }
      ]
    }
  };
};

/**
 * Gerar Schema.org para Evento
 */
export const generateEventSchema = (data: EventSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": data.name,
    "description": data.description,
    "startDate": data.startDate,
    "endDate": data.endDate,
    "location": {
      "@type": "Place",
      "name": data.location.name,
      "address": data.location.address
    },
    "organizer": {
      "@type": "Organization",
      "name": data.organizer.name,
      "url": data.organizer.url
    },
    "url": data.url,
    "image": data.image,
    "offers": data.offers ? {
      "@type": "Offer",
      "price": data.offers.price,
      "priceCurrency": data.offers.priceCurrency,
      "availability": data.offers.availability,
      "validFrom": data.offers.validFrom,
      "validThrough": data.offers.validThrough
    } : undefined,
    "eventStatus": data.eventStatus,
    "eventAttendanceMode": data.eventAttendanceMode,
    "maximumAttendeeCapacity": data.maximumAttendeeCapacity,
    "category": data.category
  };
};

/**
 * Gerar Schema.org para Lista de Eventos
 */
export const generateEventListSchema = (events: EventSchema[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Eventos Academia MAGIS",
    "description": "Lista de eventos, Simulações Temáticas e workshops da Academia MAGIS",
    "numberOfItems": events.length,
    "itemListElement": events.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": generateEventSchema(event)
    }))
  };
};

/**
 * Gerar Schema.org para Produto
 */
export const generateProductSchema = (data: ProductSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "image": data.image,
    "brand": {
      "@type": "Brand",
      "name": data.brand.name
    },
    "offers": {
      "@type": "Offer",
      "price": data.offers.price,
      "priceCurrency": data.offers.priceCurrency,
      "availability": data.offers.availability,
      "seller": {
        "@type": "Organization",
        "name": data.offers.seller.name
      }
    },
    "category": data.category,
    "sku": data.sku
  };
};

/**
 * Gerar Schema.org para Artigo/Blog Post
 */
export const generateArticleSchema = (data: ArticleSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "author": {
      "@type": "Person",
      "name": data.author.name,
      "url": data.author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": data.publisher.logo
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "image": data.image,
    "url": data.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.mainEntityOfPage
    }
  };
};

/**
 * Gerar Schema.org para Breadcrumbs
 */
export const generateBreadcrumbSchema = (data: BreadcrumbSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.itemListElement.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.item
    }))
  };
};

/**
 * Gerar Schema.org para FAQ
 */
export const generateFAQSchema = (data: FAQSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.mainEntity.map(faq => ({
      "@type": "Question",
      "name": faq.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.acceptedAnswer.text
      }
    }))
  };
};

/**
 * Gerar Schema.org para WebSite
 */
export const generateWebsiteSchema = (url: string, name: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/busca?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Gerar Schema.org para LocalBusiness
 */
export const generateLocalBusinessSchema = (data: OrganizationSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "logo": data.logo,
    "address": data.address ? {
      "@type": "PostalAddress",
      "addressCountry": data.address.addressCountry,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion
    } : undefined,
    "contactPoint": data.contactPoint ? {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "email": data.contactPoint.email,
      "contactType": data.contactPoint.contactType
    } : undefined,
    "sameAs": data.sameAs,
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "BRL"
  };
};

/**
 * Gerar Schema.org para Course
 */
export const generateCourseSchema = (name: string, description: string, provider: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": url
    },
    "courseMode": "blended",
    "educationalLevel": "beginner",
    "inLanguage": "pt-BR",
    "isAccessibleForFree": true
  };
};

/**
 * Gerar Schema.org para Service
 */
export const generateServiceSchema = (name: string, description: string, provider: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": url
    },
    "serviceType": "Educational Service",
    "areaServed": "Brazil",
    "availableLanguage": "Portuguese"
  };
};

/**
 * Dados padrão da Academia MAGIS
 */
export const MAGIS_ORGANIZATION_DATA: OrganizationSchema = {
  name: "Academia MAGIS",
  description: "Academia especializada em Simulações Temáticas, mentorias educacionais e atividades acadêmicas para democratizar o acesso à educação de qualidade",
  url: "https://academiamagis.com",
  logo: "https://academiamagis.com/logo_magis.svg",
  address: {
    addressCountry: "BR",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG"
  },
  contactPoint: {
    telephone: "+55-31-91578-389",
    email: "contato@academiamagis.com",
    contactType: "customer service"
  },
  sameAs: [
    "https://www.instagram.com/academiamagis",
    "https://www.linkedin.com/company/academiamagis",
    "https://wa.me/553191578389"
  ],
  foundingDate: "2020",
  numberOfEmployees: "10-50",
  areaServed: "Brazil"
};

/**
 * Gerar todos os schemas para a homepage
 */
export const generateHomepageSchemas = () => {
  const organizationSchema = generateOrganizationSchema(MAGIS_ORGANIZATION_DATA);
  const websiteSchema = generateWebsiteSchema(
    "https://academiamagis.com",
    "Academia MAGIS",
    "Simulações Temáticas, mentorias e workshops de diplomacia"
  );
  
  return [organizationSchema, websiteSchema];
};

/**
 * Gerar schemas para página de eventos
 */
export const generateEventPageSchemas = (events: any[]) => {
  const eventSchemas = events.map(event => generateEventSchema({
    name: event.title,
    description: event.description,
    startDate: event.start_date || event.date,
    endDate: event.end_date,
    location: {
      name: event.location
    },
    organizer: {
      name: "Academia MAGIS",
      url: "https://academiamagis.com"
    },
    url: `https://academiamagis.com/eventos/${event.id}`,
    image: event.image_url,
    offers: event.price ? {
      price: event.price.toString(),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      validFrom: event.registration_start_date,
      validThrough: event.registration_deadline
    } : undefined,
    eventStatus: event.status === 'upcoming' ? 'https://schema.org/EventScheduled' : 
                 event.status === 'ongoing' ? 'https://schema.org/EventScheduled' : 
                 'https://schema.org/EventPostponed',
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    category: event.category
  }));

  const eventListSchema = generateEventListSchema(eventSchemas);
  const organizationSchema = generateOrganizationSchema(MAGIS_ORGANIZATION_DATA);
  
  return [organizationSchema, eventListSchema];
};
