import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { diretoriaApi, Diretor } from '@/lib/supabase';

const Diretoria = () => {
  const navigate = useNavigate();
  const [diretores, setDiretores] = useState<Diretor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiretores();
  }, []);

  const loadDiretores = async () => {
    try {
      setLoading(true);
      const data = await diretoriaApi.getPublicDiretores();
      setDiretores(data);
    } catch (error) {
      console.error('Erro ao carregar diretores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre a Diretoria da Academia MAGIS.`;
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
            
            {diretores.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {diretores.map((diretor) => (
                  <Card key={diretor.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-all duration-300 h-full flex flex-col">
                    <CardHeader className="text-center pb-4">
                      {diretor.foto_url ? (
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <img
                            src={diretor.foto_url}
                            alt={diretor.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                          <Users className="w-16 h-16 text-primary" />
                        </div>
                      )}
                      <CardTitle className="text-2xl font-display font-bold text-foreground">
                        {diretor.nome}
                      </CardTitle>
                      <p className="text-primary font-semibold">{diretor.cargo}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground leading-relaxed flex-grow">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum diretor disponível</h3>
                <p className="text-muted-foreground">
                  Em breve divulgaremos nossa diretoria executiva.
                </p>
              </div>
            )}
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
