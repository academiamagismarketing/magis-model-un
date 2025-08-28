import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { voluntariosApi, Voluntario } from '@/lib/supabase';

const Voluntarios = () => {
  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);

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
            
            {voluntarios.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {voluntarios.map((voluntario) => (
                  <Card key={voluntario.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300 h-full flex flex-col">
                    <CardHeader className="text-center pb-4">
                      {voluntario.foto_url ? (
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <img
                            src={voluntario.foto_url}
                            alt={voluntario.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <Award className="w-16 h-16 text-primary" />
                        </div>
                      )}
                      <CardTitle className="text-2xl font-display font-bold text-foreground">
                        {voluntario.nome}
                      </CardTitle>
                      <p className="text-primary font-semibold">{voluntario.area}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground leading-relaxed flex-grow">
                        {voluntario.bio}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="font-semibold text-foreground mr-2">Formação:</span>
                          <span className="text-muted-foreground">{voluntario.formacao}</span>
                        </div>
                        <div className="flex items-center text-sm">
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
                <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum voluntário disponível</h3>
                <p className="text-muted-foreground">
                  Em breve divulgaremos nossa equipe de voluntários.
                </p>
              </div>
            )}
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
