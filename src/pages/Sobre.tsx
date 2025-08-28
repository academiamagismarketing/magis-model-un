import React from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Target, Award, Heart, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sobreImage from '@/assets/imagens/2.jpg';
import equipeImage from '@/assets/imagens/3.jpg';
import historiaImage from '@/assets/imagens/4.jpg';

const Sobre = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
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
              
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Sobre a Academia MAGIS
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Buscamos divulgar e facilitar o acesso a oportunidades acadêmicas para toda a comunidade, 
              tornando estes espaços cada vez mais democráticos e inclusivos
              </p>
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-display font-bold text-foreground">
                    Nossa Missão
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A Academia MAGIS tem como missão levar debates acadêmicos para a periferia acadêmica; 
                para ambientes que sistematicamente são excluídos do centro do debate político.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Buscamos desenvolver habilidades essenciais como pensamento crítico e liderança, preparando nossos jovens para os desafios do século XXI.
                </p>
                <Button
                  onClick={() => navigate('/eventos')}
                  className="btn-primary"
                >
                  Conheça Nossos Eventos
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">+500</h3>
                      <p className="text-sm text-muted-foreground">Estudantes Formados</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">50+</h3>
                      <p className="text-sm text-muted-foreground">Eventos Realizados</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">95%</h3>
                      <p className="text-sm text-muted-foreground">Satisfação</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">5</h3>
                      <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-20 bg-muted">
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
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Excelência</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buscamos a excelência em tudo que fazemos, desde a qualidade de nossos 
                  eventos até o desenvolvimento de nossos estudantes.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Paixão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa paixão pela diplomacia e relações internacionais inspira 
                  e motiva todos os que fazem parte da Academia MAGIS.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Comunidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Construímos uma comunidade forte e inclusiva, onde todos têm 
                  voz e podem contribuir para um mundo melhor.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Inovação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Estamos sempre inovando e buscando novas formas de ensinar 
                  e inspirar a próxima geração de líderes.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Liderança</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Desenvolvemos líderes que pensam globalmente e agem localmente, 
                  prontos para enfrentar os desafios do futuro.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic">
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={historiaImage} 
                  alt="História da Academia MAGIS" 
                  className="rounded-2xl shadow-diplomatic"
                />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                  Nossa História
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Fundada em 2019, a Academia MAGIS nasceu da visão de criar uma 
                  instituição de excelência em simulações da ONU e educação em 
                  relações internacionais no Brasil.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Ao longo de 5 anos, desenvolvemos uma metodologia única que 
                  combina teoria e prática, preparando nossos estudantes para 
                  os desafios globais do século XXI.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Hoje, somos referência nacional em simulações da ONU, com 
                  centenas de estudantes formados e dezenas de eventos realizados 
                  com sucesso.
                </p>
                <Button
                  onClick={() => navigate('/contato')}
                  className="btn-outline"
                >
                  Entre em Contato
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Nossa Equipe
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conheça os profissionais dedicados que fazem da Academia MAGIS 
                uma instituição de excelência.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Direção Executiva</h3>
                <p className="text-muted-foreground mb-4">
                  Liderança estratégica e visão de futuro
                </p>
                <p className="text-sm text-muted-foreground">
                  Responsável pela direção estratégica e desenvolvimento institucional.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Coordenação Pedagógica</h3>
                <p className="text-muted-foreground mb-4">
                  Excelência acadêmica e metodológica
                </p>
                <p className="text-sm text-muted-foreground">
                  Desenvolvimento de metodologias e supervisão pedagógica.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-diplomatic text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Instrutores Especializados</h3>
                <p className="text-muted-foreground mb-4">
                  Experiência e conhecimento prático
                </p>
                <p className="text-sm text-muted-foreground">
                  Profissionais com vasta experiência em simulações e diplomacia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted text-foreground">
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
                onClick={() => navigate('/eventos')}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Conheça Nossos Eventos
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Entre em Contato
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
