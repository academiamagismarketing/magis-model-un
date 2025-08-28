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
      content: 'A Academia MAGIS transformou minha visão sobre diplomacia. Os eventos são incríveis e a equipe é muito profissional. Recomendo para todos que querem se destacar.',
      rating: 5,
      event: 'SIMONU São Paulo 2023',
      achievement: 'Melhor Delegada - Conselho de Segurança'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Ex-Participante',
      university: 'PUC-SP - Direito',
      content: 'Participar dos workshops da Academia MAGIS foi fundamental para meu desenvolvimento. Aprendi técnicas de negociação que uso até hoje na minha carreira.',
      rating: 5,
      event: 'Workshop de Diplomacia',
      achievement: 'Destaque em Negociação'
    },
    {
      id: 3,
      name: 'Ana Costa',
      role: 'Ex-Coordenadora',
      university: 'FGV - Administração',
      content: 'Como coordenadora de eventos, posso dizer que a Academia MAGIS é referência em qualidade. A organização é impecável e os resultados sempre superam as expectativas.',
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
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            O que dizem nossos alunos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de quem viveu a experiência MAGIS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="text-center p-6 border-primary/20">
                <CardContent className="p-0">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-primary mb-1">{highlight.value}</h3>
                  <h4 className="text-lg font-semibold text-foreground mb-1">{highlight.label}</h4>
                  <p className="text-muted-foreground text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-primary/30 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.university}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-border">
                    <Badge variant="secondary" className="text-xs mb-2 block w-fit">
                      <Calendar className="w-3 h-3 mr-1" />
                      {testimonial.event}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {testimonial.achievement}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;