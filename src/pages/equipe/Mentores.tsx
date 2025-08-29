import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mentoresApi, Mentor } from '@/lib/supabase';

const Mentores = () => {
  const navigate = useNavigate();
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMentores();
  }, []);

  const loadMentores = async () => {
    try {
      setLoading(true);
      console.log('Carregando mentores...');
      const data = await mentoresApi.getPublicMentores();
      console.log('Mentores carregados:', data);
      setMentores(data);
    } catch (error) {
      console.error('Erro ao carregar mentores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre os mentores da Academia MAGIS.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-transition">
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Button
                onClick={() => navigate('/sobre')}
                variant="outline"
                className="mb-6 md:mb-8 text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Sobre
              </Button>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 px-4">
                Nossos Mentores
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto px-4">
                Especialistas que guiam e inspiram nossos jovens em sua jornada acadêmica
              </p>
            </div>
          </div>
        </section>

        {/* Mentores Section */}
        <section className="py-16 md:py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6 text-foreground">
                Nossa Equipe de Mentores
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Profissionais experientes que compartilham conhecimento e orientam nossos estudantes
              </p>
            </div>
            
            {mentores.length > 0 ? (
              <div className={`grid gap-6 md:gap-8 ${
                mentores.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : mentores.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {mentores.map((mentor) => (
                  <Card 
                    key={mentor.id} 
                    className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300 h-full flex flex-col"
                  >
                    <CardHeader className="text-center pb-4">
                      {mentor.foto_url ? (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <img
                            src={mentor.foto_url}
                            alt={mentor.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <Star className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                        </div>
                      )}
                      <CardTitle className="text-xl md:text-2xl font-display font-bold text-foreground">
                        {mentor.nome}
                      </CardTitle>
                      <p className="text-primary font-semibold text-sm md:text-base">{mentor.especialidade}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground leading-relaxed flex-grow text-sm md:text-base">
                        {mentor.bio}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                          <span className="font-semibold text-foreground mr-2">Formação:</span>
                          <span className="text-muted-foreground">{mentor.formacao}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                          <span className="font-semibold text-foreground mr-2">Experiência:</span>
                          <span className="text-muted-foreground">{mentor.experiencia}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                          <span className="font-semibold text-foreground mr-2">Eventos Mentorados:</span>
                          <span className="text-muted-foreground">{mentor.eventos_mentorados}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">Nenhum mentor disponível</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Em breve divulgaremos nossa equipe de mentores.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-muted text-foreground section-decor">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6">
              Quer Ser Mentorado?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Conecte-se com nossos mentores e acelere seu desenvolvimento acadêmico!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
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
