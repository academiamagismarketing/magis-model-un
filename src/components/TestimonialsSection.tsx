import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ana Carolina Silva",
      role: "Ex-aluna • Agora em Relações Internacionais - USP",
      content: "A Academia Magis transformou minha visão sobre diplomacia. As simulações me prepararam não só para a universidade, mas para pensar criticamente sobre questões globais. Hoje sou bolsista em RI graças ao que aprendi aqui.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c6d8e35b?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Pedro Henrique Costa",
      role: "Atual aluno • 3º ano Ensino Médio",
      content: "Nunca pensei que pudesse falar em público com tanta confiança. Os professores da Academia Magis me ensinaram não só sobre diplomacia, mas sobre liderança. Agora sou presidente do grêmio da minha escola!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mariana Oliveira",
      role: "Ex-aluna • Aprovada em Direito - FGV",
      content: "As simulações da ONU da Academia Magis me deram uma visão global que foi essencial na minha aprovação em Direito. O método de ensino é único - aprendi negociação, oratória e pensamento estratégico.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Gabriel Santos",
      role: "Ex-aluno • Intercâmbio EUA",
      content: "Graças à Academia Magis, consegui uma bolsa de intercâmbio nos EUA. As habilidades de comunicação internacional que desenvolvi aqui foram fundamentais. Recomendo para qualquer jovem que quer fazer diferença no mundo.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            O que Nossos <span className="text-gradient">Alunos Dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Histórias reais de transformação através da diplomacia e do desenvolvimento 
            de liderança internacional.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-diplomatic transition-diplomatic border-0 bg-card relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 h-16 text-primary" />
              </div>
              
              <CardContent className="p-8 relative z-10">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-primary rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-display font-bold mb-8">
            Resultados que Falam por Si
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Taxa de Aprovação em Vestibulares</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Alunos em Universidades de Prestígio</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Alunos Transformados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Países Representados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;