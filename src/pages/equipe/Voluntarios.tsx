import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { voluntariosApi, Voluntario } from '@/lib/supabase';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const Voluntarios = () => {
  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);

  // Animações
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: voluntariosRef, isVisible: voluntariosVisible } = useScrollAnimation();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const visibleItems = useStaggerAnimation(voluntarios, 0.1);

  useEffect(() => {
    loadVoluntarios();
  }, []);

  const loadVoluntarios = async () => {
    try {
      setLoading(true);
      const data = await voluntariosApi.getPublicVoluntarios();
      setVoluntarios(data);
    } catch (error) {
      console.error('Erro ao carregar voluntários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre como ser voluntário na Academia MAGIS.`;
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
        <section 
          ref={heroRef}
          className={`relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden transition-all duration-700 ${
            heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
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
                Nossos Voluntários
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto px-4">
                Pessoas dedicadas que nos ajudam a construir e desenvolver o projeto da Academia MAGIS
              </p>
            </div>
          </div>
        </section>

        {/* Voluntários Section */}
        <section 
          ref={voluntariosRef}
          className={`py-16 md:py-20 bg-background section-decor transition-all duration-700 ${
            voluntariosVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6 text-foreground">
                Nossa Equipe de Voluntários
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Pessoas responsáveis por nos ajudar a construir o projeto e fazer a diferença na vida dos jovens
              </p>
            </div>
            
            {voluntarios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {voluntarios.map((voluntario, index) => (
                  <Card 
                    key={voluntario.id} 
                    className={`group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300 h-full flex flex-col animate-fade-in-up animate-delay-${Math.min(index * 100, 500)} ${
                      visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <CardHeader className="text-center pb-4">
                      {voluntario.foto_url ? (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <img
                            src={voluntario.foto_url}
                            alt={voluntario.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <Award className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                        </div>
                      )}
                      <CardTitle className="text-xl md:text-2xl font-display font-bold text-foreground">
                        {voluntario.nome}
                      </CardTitle>
                      <p className="text-primary font-semibold text-sm md:text-base">{voluntario.area}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground leading-relaxed flex-grow text-sm md:text-base">
                        {voluntario.bio}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                          <span className="font-semibold text-foreground mr-2">Formação:</span>
                          <span className="text-muted-foreground">{voluntario.formacao}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                          <span className="font-semibold text-foreground mr-2">Tempo como Voluntário:</span>
                          <span className="text-muted-foreground">{voluntario.tempo_voluntario}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">Nenhum voluntário disponível</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Em breve divulgaremos nossa equipe de voluntários.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className={`py-16 md:py-20 bg-muted text-foreground section-decor transition-all duration-700 ${
            ctaVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6">
              Quer Ser Voluntário?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Junte-se à nossa equipe e ajude-nos a fazer a diferença na vida dos jovens!
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

export default Voluntarios;
