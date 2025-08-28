import React from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Diretoria = () => {
  const navigate = useNavigate();

  const diretores = [
    {
      id: 1,
      nome: "Nome do Diretor 1",
      cargo: "Diretor Executivo",
      foto: "/placeholder-avatar.jpg",
      bio: "Formado em Relações Internacionais pela Universidade de São Paulo, com especialização em Diplomacia e Negociações Internacionais. Possui mais de 5 anos de experiência em simulações da ONU e coordenação de eventos acadêmicos.",
      formacao: "Relações Internacionais - USP",
      experiencia: "5+ anos em simulações da ONU",
      linkedin: "https://linkedin.com/in/diretor1",
      email: "diretor1@academiamagis.com"
    },
    {
      id: 2,
      nome: "Nome da Diretora 2",
      cargo: "Diretora de Projetos",
      foto: "/placeholder-avatar.jpg",
      bio: "Mestra em Ciência Política com foco em Política Internacional. Coordenou mais de 20 eventos acadêmicos e desenvolveu metodologias inovadoras para formação de jovens líderes.",
      formacao: "Mestrado em Ciência Política - UNB",
      experiencia: "20+ eventos coordenados",
      linkedin: "https://linkedin.com/in/diretora2",
      email: "diretora2@academiamagis.com"
    },
    {
      id: 3,
      nome: "Nome do Diretor 3",
      cargo: "Diretor de Comunicação",
      foto: "/placeholder-avatar.jpg",
      bio: "Especialista em Comunicação Internacional e Marketing Digital. Responsável pela estratégia de comunicação da Academia MAGIS e pela expansão da nossa presença digital.",
      formacao: "Comunicação Social - PUC",
      experiencia: "Especialista em Marketing Digital",
      linkedin: "https://linkedin.com/in/diretor3",
      email: "diretor3@academiamagis.com"
    }
  ];

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre a Diretoria da Academia MAGIS.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Button
                onClick={() => navigate('/sobre')}
                variant="outline"
                className="mb-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Sobre
              </Button>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Diretoria Executiva
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Conheça os líderes responsáveis pela organização e direção estratégica da Academia MAGIS
              </p>
            </div>
          </div>
        </section>

        {/* Diretores Section */}
        <section className="py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Nossa Diretoria
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Profissionais dedicados que lideram nossa missão de democratizar o acesso ao conhecimento acadêmico
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {diretores.map((diretor) => (
                <Card key={diretor.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-display font-bold text-foreground">
                      {diretor.nome}
                    </CardTitle>
                    <p className="text-primary font-semibold">{diretor.cargo}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {diretor.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Formação:</span>
                        <span className="text-muted-foreground">{diretor.formacao}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Experiência:</span>
                        <span className="text-muted-foreground">{diretor.experiencia}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(diretor.linkedin, '_blank')}
                        className="flex-1"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`mailto:${diretor.email}`, '_blank')}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted text-foreground section-decor">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Entre em Contato com Nossa Diretoria
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tem alguma dúvida ou proposta? Nossa diretoria está sempre disponível para conversar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Outras Formas de Contato
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Diretoria;
