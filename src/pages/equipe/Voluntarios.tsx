import React from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award, Linkedin, Mail, MessageSquare, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Voluntarios = () => {
  const navigate = useNavigate();

  const voluntarios = [
    {
      id: 1,
      nome: "Nome do Voluntário 1",
      area: "Logística e Eventos",
      foto: "/placeholder-avatar.jpg",
      bio: "Estudante de Administração apaixonado por organização de eventos. Responsável pela coordenação logística dos nossos eventos e pela experiência dos participantes.",
      formacao: "Administração - UFMG",
      tempoVoluntario: "2 anos",
      linkedin: "https://linkedin.com/in/voluntario1",
      email: "voluntario1@academiamagis.com"
    },
    {
      id: 2,
      nome: "Nome da Voluntária 2",
      area: "Comunicação e Marketing",
      foto: "/placeholder-avatar.jpg",
      bio: "Comunicóloga especializada em redes sociais. Gerencia nossa presença digital e cria conteúdo que conecta jovens com oportunidades acadêmicas.",
      formacao: "Comunicação Social - PUC",
      tempoVoluntario: "1.5 anos",
      linkedin: "https://linkedin.com/in/voluntaria2",
      email: "voluntaria2@academiamagis.com"
    },
    {
      id: 3,
      nome: "Nome do Voluntário 3",
      area: "Pedagogia e Treinamento",
      foto: "/placeholder-avatar.jpg",
      bio: "Pedagogo com experiência em educação não-formal. Desenvolve metodologias de treinamento para nossos delegados e coordena workshops educativos.",
      formacao: "Pedagogia - UFOP",
      tempoVoluntario: "3 anos",
      linkedin: "https://linkedin.com/in/voluntario3",
      email: "voluntario3@academiamagis.com"
    },
    {
      id: 4,
      nome: "Nome da Voluntária 4",
      area: "Relações Internacionais",
      foto: "/placeholder-avatar.jpg",
      bio: "Graduanda em Relações Internacionais e ex-delegada da Academia MAGIS. Apoia na organização de simulações e mentoria de novos participantes.",
      formacao: "Relações Internacionais - UFMG",
      tempoVoluntario: "1 ano",
      linkedin: "https://linkedin.com/in/voluntaria4",
      email: "voluntaria4@academiamagis.com"
    }
  ];

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre como ser voluntário na Academia MAGIS.`;
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
                Nossos Voluntários
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Pessoas dedicadas que doam seu tempo e conhecimento para construir um projeto melhor
              </p>
            </div>
          </div>
        </section>

        {/* Voluntários Section */}
        <section className="py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Quem Nos Ajuda a Construir
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Nossos voluntários são o coração da Academia MAGIS, dedicando seu tempo e expertise para democratizar o acesso ao conhecimento
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {voluntarios.map((voluntario) => (
                <Card key={voluntario.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Award className="w-16 h-16 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-display font-bold text-foreground">
                      {voluntario.nome}
                    </CardTitle>
                    <p className="text-primary font-semibold">{voluntario.area}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {voluntario.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Formação:</span>
                        <span className="text-muted-foreground">{voluntario.formacao}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-foreground mr-2">Tempo como Voluntário:</span>
                        <span className="text-muted-foreground">{voluntario.tempoVoluntario}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(voluntario.linkedin, '_blank')}
                        className="flex-1"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`mailto:${voluntario.email}`, '_blank')}
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
              Quer Ser Voluntário?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tem vontade de fazer parte da nossa equipe? Entre em contato e descubra como pode contribuir para democratizar o acesso ao conhecimento acadêmico!
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

export default Voluntarios;
