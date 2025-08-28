import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import contatoImage from '@/assets/imagens/5.jpg';

const Contato = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Animações
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation();
  const { elementRef: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Nova mensagem do site Academia MAGIS*

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}

---
Enviado através do site da Academia MAGIS`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
    
    // Limpar formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const faqs = [
    {
      question: "Como posso participar dos eventos da Academia MAGIS?",
      answer: "Você pode solicitar inscrição através do nosso WhatsApp. Nossa equipe entrará em contato para fornecer todas as informações necessárias."
    },
    {
      question: "Os eventos são presenciais ou online?",
      answer: "Oferecemos tanto eventos presenciais quanto online, dependendo do tipo de atividade e das circunstâncias. Sempre informamos a modalidade no momento da inscrição."
    },
    {
      question: "Há algum pré-requisito para participar?",
      answer: "A maioria dos nossos eventos é aberta a estudantes do ensino médio e superior. Alguns eventos específicos podem ter pré-requisitos que são informados previamente."
    },
    {
      question: "Como funciona o processo de mentoria individual?",
      answer: "As mentorias em grupo são gratuitas e adaptadas de acordo com as necessidades e objetivos do grupo. Inclui sessões semanais, material de apoio e acompanhamento contínuo para seu desenvolvimento."
    }
  ];

  return (
    <div className="min-h-screen page-transition">
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className={`relative pt-40 pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden transition-all duration-700 ${
            heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={contatoImage} 
              alt="Contato Academia MAGIS" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in-up animate-delay-200">
                Entre em Contato
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animate-delay-400">
                Estamos aqui para ajudar você a descobrir o mundo da diplomacia 
                e das relações internacionais. Fale conosco!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section 
          ref={formRef}
          className={`py-20 bg-background transition-all duration-700 ${
            formVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="animate-fade-in-left animate-delay-200">
                <h2 className="text-3xl font-display font-bold mb-8 text-foreground">
                  Envie sua Mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-foreground">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-foreground">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-2 min-h-32"
                      placeholder="Conte-nos mais sobre sua dúvida ou interesse..."
                    />
                  </div>
                  
                  <Button type="submit" variant="diplomatic" className="w-full btn-animate hover-glow">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="animate-fade-in-right animate-delay-300">
                <h2 className="text-3xl font-display font-bold mb-8 text-foreground">
                  Informações de Contato
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 icon-bounce">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Telefone</h3>
                      <p className="text-muted-foreground">+55 31 9157-8389</p>
                      <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 icon-bounce">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground">institucional@academiamagis.com</p>
                      <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 icon-bounce">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Localização</h3>
                      <p className="text-muted-foreground">Belo Horizonte, MG - Brasil</p>
                      <p className="text-sm text-muted-foreground">Eventos presenciais e online</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 icon-bounce">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-sm text-muted-foreground">Sábado: 9h às 12h</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-12 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover-lift">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                      Atendimento Rápido via WhatsApp
                    </h3>
                    <p className="text-green-700 mb-6">
                      Para dúvidas urgentes ou informações rápidas, entre em contato diretamente pelo WhatsApp.
                    </p>
                    <Button
                      onClick={() => window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia Magis.', '_blank')}
                      variant="whatsapp"
                      className="bg-green-600 hover:bg-green-700 text-white btn-animate hover-glow"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Falar no WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          ref={faqRef}
          className={`py-20 bg-muted transition-all duration-700 ${
            faqVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4">
                          <div className="text-center mb-16 animate-fade-in-up animate-delay-200">
                <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                  Perguntas Frequentes
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Respostas para as dúvidas mais comuns sobre nossos eventos e serviços.
                </p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-background p-8 rounded-2xl shadow-diplomatic card-animate hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 icon-bounce">
                      <HelpCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className={`py-20 bg-muted text-foreground transition-all duration-700 ${
            ctaVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6 animate-fade-in-up animate-delay-200">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
              Entre em contato conosco e descubra como a Academia MAGIS pode 
              transformar sua jornada na diplomacia e relações internacionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
              <Button
                onClick={() => window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS.', '_blank')}
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
                Ver Eventos
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contato;
