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

};

export default TestimonialsSection;