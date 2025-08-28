import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Award, 
  Globe, 
  Calendar,
  MessageSquare
} from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '80+',
      label: 'Delegados',
      description: 'Estudantes que participaram de nossos eventos'
    },
    {
      icon: Award,
      value: '50+',
      label: 'Prêmios Conquistados',
      description: 'Reconhecimentos em competições nacionais'
    },
    {
      icon: Calendar,
      value: '10+',
      label: 'Eventos Participados',
      description: 'Simulações da ONU e outros eventos'
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS e nossos resultados.', '_blank');
  };

};

export default StatsSection;