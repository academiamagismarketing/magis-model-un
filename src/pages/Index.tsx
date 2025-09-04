import React from 'react';
// import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Target, MessageSquare, GraduationCap } from 'lucide-react';

const Index = () => {
  console.log('🔄 Index component iniciando...');
  
  try {
    console.log('✅ Index render successful');
    
    return (
      <div style={{ backgroundColor: 'red', color: 'white', padding: '20px' }}>
        <h1>TESTE - Se você pode ver isso, o React está funcionando!</h1>
        <p>Data: {new Date().toString()}</p>
        <p>Componente Index carregado com sucesso!</p>
      </div>
    );
  } catch (error) {
    console.error('❌ Erro no Index:', error);
    return (
      <div style={{ backgroundColor: 'orange', color: 'black', padding: '20px' }}>
        <h1>ERRO NO INDEX</h1>
        <p>Erro: {error?.toString()}</p>
      </div>
    );
  }
};

export default Index;