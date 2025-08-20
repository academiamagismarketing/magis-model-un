import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Quote, 
  Users,
  Calendar
} from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Ex-Delegada',
      university: 'USP - Relações Internacionais',
      content: 'A Academia Magis transformou minha visão sobre diplomacia. Os eventos são incríveis e a equipe é muito profissional. Recomendo para todos que querem se destacar.',
      rating: 5,
      event: 'SIMONU São Paulo 2023',
      achievement: 'Melhor Delegada - Conselho de Segurança'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Ex-Participante',
      university: 'PUC-SP - Direito',
      content: 'Participar dos workshops da Academia Magis foi fundamental para meu desenvolvimento. Aprendi técnicas de negociação que uso até hoje na minha carreira.',
      rating: 5,
      event: 'Workshop de Diplomacia',
      achievement: 'Destaque em Negociação'
    },
    {
      id: 3,
      name: 'Ana Costa',
      role: 'Ex-Coordenadora',
      university: 'FGV - Administração',
      content: 'Como coordenadora de eventos, posso dizer que a Academia Magis é referência em qualidade. A organização é impecável e os resultados sempre superam as expectativas.',
      rating: 5,
      event: 'Conferência Internacional 2023',
      achievement: 'Melhor Organização'
    }
  ];

  const highlights = [
    {
      icon: Users,
      value: '200+',
      label: 'Alunos por Ano',
      description: 'Participantes em nossos programas'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Avaliação Geral',
      description: 'Nota média nas avaliações'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Quote className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              O Que Dizem Sobre Nós
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Depoimentos de ex-participantes que transformaram suas carreiras 
            através dos nossos programas e eventos.
          </p>
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Event Info */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {testimonial.event}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.achievement}
                  </Badge>
                </div>

                {/* Author */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.university}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Destaques */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <highlight.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {highlight.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {highlight.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {highlight.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;