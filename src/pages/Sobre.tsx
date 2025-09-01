import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Target, Award, Heart, Clock, Star, MessageSquare, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Removendo temporariamente os hooks de animação para testar se é isso que está causando o problema
// import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { statisticsApi, Statistic } from '@/lib/supabase';
import sobreImage from '@/assets/imagens/2.jpg';
import equipeImage from '@/assets/imagens/3.jpg';
import historiaImage from '@/assets/imagens/4.jpg';

const Sobre = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [timeOfOperation, setTimeOfOperation] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Removendo temporariamente os hooks de animação para testar se é isso que está causando o problema
  // Animações
  // const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  // const { elementRef: missaoRef, isVisible: missaoVisible } = useScrollAnimation();
  // const { elementRef: valoresRef, isVisible: valoresVisible } = useScrollAnimation();
  // const { elementRef: historiaRef, isVisible: historiaVisible } = useScrollAnimation();
  // const { elementRef: equipeRef, isVisible: equipeVisible } = useScrollAnimation();
  // const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  useEffect(() => {
    console.log('useEffect executado');
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      console.log('Carregando estatísticas...');
      const data = await statisticsApi.getPublicStatistics();
      console.log('Estatísticas carregadas:', data);
      setStatistics(data);
      
      // Calcular tempo de atuação
      const months = statisticsApi.calculateTimeOfOperation();
      setTimeOfOperation(months);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatisticValue = (key: string) => {
    const stat = statistics.find(s => s.key === key);
    if (!stat) return 0;
    
    console.log(`Buscando estatística para chave: ${key}`, stat);
    
    switch (key) {
      case 'valores_arrecadados':
        return stat.value;
      case 'delegados':
      case 'eventos_realizados':
        return Math.floor(stat.value);
      default:
        return stat.value;
    }
  };

  const formatStatisticValue = (key: string, value: number) => {
    switch (key) {
      case 'valores_arrecadados':
        return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      case 'delegados':
      case 'eventos_realizados':
        return value.toLocaleString('pt-BR');
      default:
        return value.toString();
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre a Academia MAGIS e como posso participar dos eventos.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    console.log('Página em modo de carregamento');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  console.log('Renderizando página Sobre', { statistics, timeOfOperation, loading });

  return (
    <div className="min-h-screen page-transition">
      <main>
        {/* Hero Section */}
        <section 
          // ref={heroRef}
          className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden transition-all duration-700"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={sobreImage} 
              alt="Sobre Academia MAGIS" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 px-4">
                Sobre a Academia MAGIS
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto px-4">
                Buscamos divulgar e facilitar o acesso a oportunidades acadêmicas para toda a comunidade, 
                tornando estes espaços cada vez mais democráticos e inclusivos
              </p>
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section 
          // ref={missaoRef}
          className="py-16 md:py-20 bg-background section-decor transition-all duration-700"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="">
                <div className="flex items-center mb-4 md:mb-6">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    Nossa Missão
                  </h2>
                </div>
                <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  A Academia MAGIS tem como missão levar debates acadêmicos para a periferia acadêmica; 
                  para ambientes que sistematicamente são excluídos do centro do debate político.
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  Buscamos desenvolver habilidades essenciais como pensamento crítico e liderança, preparando nossos jovens para os desafios do século XXI.
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="btn-primary btn-animate hover-glow w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Fale Conosco
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 md:p-8 hover-lift">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 icon-bounce">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                        {formatStatisticValue('delegados', getStatisticValue('delegados'))}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">Delegados</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 icon-bounce">
                        <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                        {formatStatisticValue('eventos_realizados', getStatisticValue('eventos_realizados'))}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">Eventos</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 icon-bounce">
                        <Star className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                        {formatStatisticValue('valores_arrecadados', getStatisticValue('valores_arrecadados'))}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">Arrecadados</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 icon-bounce">
                        <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                        {timeOfOperation}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">Meses de Atuação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section 
          // ref={valoresRef}
          className="py-20 bg-muted section-decor transition-all duration-700"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Nossos Valores
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Os princípios que guiam nossa missão e moldam o futuro dos nossos estudantes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Excelência</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buscamos a excelência em tudo que fazemos, desde a qualidade de nossos 
                  eventos até o desenvolvimento de nossos estudantes.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Paixão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa paixão pela diplomacia e relações internacionais inspira 
                  e motiva todos os que fazem parte da Academia MAGIS.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Comunidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Construímos uma comunidade forte e inclusiva, onde todos têm 
                  voz e podem contribuir para um mundo melhor.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Inovação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Estamos sempre inovando e buscando novas formas de ensinar 
                  e inspirar a próxima geração de líderes.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Liderança</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Desenvolvemos líderes que pensam globalmente e agem localmente, 
                  prontos para enfrentar os desafios do futuro.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Sustentabilidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Promovemos práticas sustentáveis e responsabilidade social, 
                  preparando líderes conscientes do impacto de suas ações.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section 
          // ref={historiaRef}
          className="py-20 bg-background section-decor transition-all duration-700"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={historiaImage} 
                  alt="História da Academia MAGIS" 
                  className="rounded-2xl shadow-diplomatic hover-lift"
                />
              </div>
              <div className="">
                <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                  Nossa História
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Fundada em 2024, a Academia MAGIS nasceu do sonho de democratizar o mundo acadêmico - com destaque para as Simulações da ONU.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Ao longo do tempo, desenvolvemos uma metodologia única que combina teoria e práxis, preparando jovens para os desafios do Século XXI.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Hoje somos referência regional em Simulações da ONU, com dezenas de delegados enviados para inúmeros eventos. 
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="btn-outline btn-animate hover-glow"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Entre em Contato
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section 
          // ref={equipeRef}
          className="py-20 md:py-24 bg-gradient-to-br from-primary/5 to-primary/10 section-decor transition-all duration-700"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
                Nossa Equipe
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto px-4 leading-relaxed">
                Conheça os profissionais dedicados que fazem da Academia MAGIS 
                uma instituição de excelência e transformação.
              </p>
              <div className="mt-8">
                <p className="text-lg text-primary font-medium">
                  Clique em cada seção para conhecer nossa equipe completa!
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              <div className="bg-background p-8 md:p-10 rounded-3xl shadow-diplomatic text-center card-animate hover-lift group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300" onClick={() => navigate('/equipe/diretoria')}>
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-12 h-12 md:w-14 md:h-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Diretoria Executiva</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Liderança estratégica responsável pela organização e direcionamento do projeto
                </p>
                <div className="bg-primary/5 rounded-xl p-4 mb-6">
                  <p className="text-sm md:text-base text-primary font-semibold">
                    Clique e conheça nossos diretores!
                  </p>
                </div>
                <div className="text-primary font-bold text-base md:text-lg group-hover:underline flex items-center justify-center space-x-2">
                  <span>Ver Diretoria</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="bg-background p-8 md:p-10 rounded-3xl shadow-diplomatic text-center card-animate hover-lift group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300" onClick={() => navigate('/equipe/voluntarios')}>
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-12 h-12 md:w-14 md:h-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Voluntários</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Pessoas dedicadas que nos ajudam a construir e expandir o projeto
                </p>
                <div className="bg-primary/5 rounded-xl p-4 mb-6">
                  <p className="text-sm md:text-base text-primary font-semibold">
                    Conheça quem nos apoia!
                  </p>
                </div>
                <div className="text-primary font-bold text-base md:text-lg group-hover:underline flex items-center justify-center space-x-2">
                  <span>Ver Voluntários</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="bg-background p-8 md:p-10 rounded-3xl shadow-diplomatic text-center card-animate hover-lift group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300" onClick={() => navigate('/equipe/mentores')}>
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="w-12 h-12 md:w-14 md:h-14 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">Mentores</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Especialistas responsáveis por treinar jovens para eventos acadêmicos
                </p>
                <div className="bg-primary/5 rounded-xl p-4 mb-6">
                  <p className="text-sm md:text-base text-primary font-semibold">
                    Conheça nossos especialistas!
                  </p>
                </div>
                <div className="text-primary font-bold text-base md:text-lg group-hover:underline flex items-center justify-center space-x-2">
                  <span>Ver Mentores</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Call to Action adicional */}
            <div className="mt-16 md:mt-20 text-center">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-primary/10 shadow-diplomatic">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Quer fazer parte da nossa equipe?
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Junte-se a nós e ajude a transformar vidas através da educação e da diplomacia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleWhatsApp}
                    size="lg"
                    className="btn-primary btn-animate hover-glow"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Falar Conosco
                  </Button>
                  <Button
                    onClick={() => navigate('/eventos')}
                    size="lg"
                    variant="outline"
                    className="btn-outline btn-animate"
                  >
                    Conhecer Eventos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          // ref={ctaRef}
          className="py-20 bg-muted text-foreground section-decor transition-all duration-700"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Faça Parte da Nossa História
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Junte-se à Academia MAGIS e descubra o poder da diplomacia, 
              da liderança e das relações internacionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 btn-animate hover-glow"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/eventos')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 btn-animate"
              >
                Conheça Nossos Eventos
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sobre;
