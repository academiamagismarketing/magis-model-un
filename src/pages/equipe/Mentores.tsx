import React from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, Linkedin, Mail, MessageSquare, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Mentores = () => {
  const navigate = useNavigate();

  const mentores = [
    {
      id: 1,
      nome: "Nome do Mentor 1",
      especialidade: "Diplomacia e Negociações",
      foto: "/placeholder-avatar.jpg",
      bio: "Diplomata de carreira com mais de 15 anos de experiência em negociações internacionais. Especialista em resolução de conflitos e protocolo diplomático.",
      formacao: "Relações Internacionais - USP",
      experiencia: "15+ anos como diplomata",
      eventosMentorados: "50+ simulações",
      linkedin: "https://linkedin.com/in/mentor1",
      email: "mentor1@academiamagis.com"
    },
    {
      id: 2,
      nome: "Nome da Mentora 2",
      especialidade: "Oratória e Debate",
      foto: "/placeholder-avatar.jpg",
      bio: "Professora universitária especializada em comunicação e oratória. Treina nossos delegados em técnicas de argumentação e apresentação em público.",
      formacao: "Doutorado em Comunicação - UFMG",
      experiencia: "10+ anos como professora",
      eventosMentorados: "30+ workshops",
      linkedin: "https://linkedin.com/in/mentora2",
      email: "mentora2@academiamagis.com"
    },
    {
      id: 3,
      nome: "Nome do Mentor 3",
      especialidade: "Política Internacional",
      foto: "/placeholder-avatar.jpg",
      bio: "Pesquisador em Política Internacional com foco em Organizações Internacionais. Especialista em estrutura da ONU e processos de tomada de decisão.",
      formacao: "Mestrado em Ciência Política - UNB",
      experiencia: "8+ anos de pesquisa",
      eventosMentorados: "25+ simulações",
      linkedin: "https://linkedin.com/in/mentor3",
      email: "mentor3@academiamagis.com"
    },
    {
      id: 4,
      nome: "Nome da Mentora 4",
      especialidade: "Direito Internacional",
      foto: "/placeholder-avatar.jpg",
      bio: "Advogada especializada em Direito Internacional Público. Mestra em Direito Internacional e especialista em tribunais internacionais e resolução de disputas.",
      formacao: "Mestrado em Direito Internacional - UFMG",
      experiencia: "12+ anos como advogada",
      eventosMentorados: "40+ simulações",
      linkedin: "https://linkedin.com/in/mentora4",
      email: "mentora4@academiamagis.com"
    }
  ];

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre nossos mentores e programas de mentoria da Academia MAGIS.`;
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
                Nossos Mentores
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Especialistas dedicados a treinar e inspirar a próxima geração de líderes acadêmicos
              </p>
            </div>
          </div>
        </section>

        {/* Mentores Section */}
        <section className="py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Especialistas em Formação
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Nossos mentores são profissionais experientes que compartilham seu conhecimento para formar jovens líderes
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mentores.map((mentor) => (
                <Card key={mentor.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Star className="w-16 h-16 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-display font-bold text-foreground">
                      {mentor.nome}
                    </CardTitle>
                    <p className="text-primary font-semibold">{mentor.especialidade}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {mentor.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Formação:</span>
                        <span className="text-muted-foreground">{mentor.formacao}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Experiência:</span>
                        <span className="text-muted-foreground">{mentor.experiencia}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Eventos Mentorados:</span>
                        <span className="text-muted-foreground">{mentor.eventosMentorados}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(mentor.linkedin, '_blank')}
                        className="flex-1"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`mailto:${mentor.email}`, '_blank')}
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
              Quer Ser Mentorado?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tem interesse em receber mentoria de nossos especialistas? Entre em contato e descubra como nossos mentores podem ajudar você a se desenvolver!
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

export default Mentores;
