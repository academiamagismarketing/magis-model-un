import React from 'react';
import { TrendingUp, Users, Award, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoIcon from '@/components/LogoIcon';

const StatsSection = () => {
  const mainStat = {
    value: "95%",
    label: "Taxa de Aprovação em Universidades de Prestígio",
    description: "Nossos alunos conquistam vagas nas melhores instituições do país"
  };

  const secondaryStats = [
    {
      icon: Users,
      value: "500+",
      label: "Estudantes Transformados",
      color: "bg-secondary"
    },
    {
      icon: Award,
      value: "50+",
      label: "Eventos Realizados",
      color: "bg-accent"
    },
    {
      icon: Globe2,
      value: "15+",
      label: "Países Representados",
      color: "bg-primary"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Main Statistic */}
        <div className="text-center mb-16">
          <div className="relative max-w-4xl mx-auto">
            {/* Background Design Elements */}
            <div className="absolute -top-8 -left-8 opacity-10">
              <LogoIcon className="w-32 h-32 text-primary" variant="colorful" />
            </div>
            
            {/* Main Content */}
            <div className="relative bg-white rounded-3xl shadow-brand p-12 border border-primary/10">
              <div className="text-8xl md:text-9xl font-display font-bold text-primary mb-4">
                {mainStat.value}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                {mainStat.label}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {mainStat.description}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryStats.map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-diplomatic hover:shadow-brand transition-brand p-8 text-center border border-border/50 h-full">
                <div className={`w-16 h-16 rounded-full ${stat.color} mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-brand`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-display font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h4 className="text-2xl font-display font-bold text-foreground mb-4">
            Faça Parte Dessa Estatística de Sucesso
          </h4>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se aos nossos alunos que já conquistaram vagas nas melhores universidades 
            e oportunidades internacionais através da diplomacia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://wa.me/553191578389?text=Olá! Quero fazer parte da Academia Magis.', '_blank')}
              size="lg"
              className="btn-primary px-8 py-3 font-semibold shadow-brand hover:shadow-elegant transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Quero Ser o Próximo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;