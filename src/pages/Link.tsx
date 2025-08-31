import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Instagram, 
  MessageSquare, 
  Heart,
  ExternalLink
} from 'lucide-react';
import logoPreta from '../../logo_preta_menu_links.png';

const LinkPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animação do header
    if (headerRef.current) {
      headerRef.current.style.opacity = '0';
      headerRef.current.style.transform = 'translateY(15px)';
      
      requestAnimationFrame(() => {
        headerRef.current!.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        headerRef.current!.style.opacity = '1';
        headerRef.current!.style.transform = 'translateY(0)';
      });
    }
    
    // Animação escalonada dos botões
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('button');
      buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
          button.style.transition = 'opacity 0.25s ease-out, transform 0.25s ease-out';
          button.style.opacity = '1';
          button.style.transform = 'translateY(0)';
        }, 150 + (index * 80));
      });
    }
  }, []);

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre a Academia MAGIS.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/magisacademia/', '_blank');
  };

  const handleWhatsAppIcon = () => {
    const message = `Olá! Gostaria de saber mais sobre a Academia MAGIS.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  const handleVakinha = () => {
    window.open('https://www.vakinha.com.br/vaquinha/nos-ajude-a-conceder-bolsas-de-estudo-para-jovens', '_blank');
  };

  const handleSite = () => {
    window.location.href = '/';
  };

  // Efeitos otimizados para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    target.style.transform = 'scale(0.96)';
    target.style.transition = 'transform 0.15s ease-out';
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    setTimeout(() => {
      target.style.transform = '';
    }, 150);
  };

     return (
     <div className="min-h-screen bg-white">
       {/* Container principal */}
       <div className="max-w-sm mx-auto px-8 py-12">
         
                   {/* Header com logo e informações */}
          <div 
            ref={headerRef}
            className="text-center mb-10"
          >
            {/* Logo */}
            <div className="mb-6">
              <img 
                src={logoPreta} 
                alt="Academia MAGIS" 
                className="h-24 mx-auto transition-transform duration-200 hover:scale-105"
              />
            </div>
            
            {/* Nome da empresa */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3 font-sifonn">
              Academia MAGIS
            </h1>
            
            {/* Slogan */}
            <p className="text-gray-600 text-base font-montserrat mb-6">
              Formando líderes para o futuro
            </p>

            {/* Ícones de redes sociais */}
            <div className="flex justify-center space-x-8 mb-8">
                           {/* WhatsApp */}
              <button
                onClick={handleWhatsAppIcon}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform duration-150"
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </button>
              
              {/* Instagram */}
              <button
                onClick={handleInstagram}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform duration-150"
              >
                <Instagram className="w-7 h-7 text-white" />
              </button>
           </div>
         </div>

                   {/* Links principais */}
          <div 
            ref={buttonsRef}
            className="space-y-5"
          >
            {/* Site Principal */}
            <Button 
              onClick={handleSite}
              variant="outline"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full bg-white text-gray-900 border-2 border-gray-200 font-medium py-5 px-6 rounded-2xl shadow-md transition-all duration-150 active:scale-[0.98]"
            >
              <Home className="w-6 h-6 mr-3" />
              Visite Nosso Site
            </Button>

            {/* Botão de contato WhatsApp */}
            <Button 
              onClick={handleWhatsApp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full bg-green-600 text-white font-medium py-5 px-6 rounded-2xl shadow-md transition-all duration-150 active:scale-[0.98]"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Fale Conosco no WhatsApp
            </Button>

            {/* Vakinha */}
            <Button 
              onClick={handleVakinha}
              variant="outline"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full bg-red-600 text-white font-medium py-5 px-6 rounded-2xl shadow-md transition-all duration-150 active:scale-[0.98]"
            >
              <Heart className="w-6 h-6 mr-3" />
              Faça uma Doação
            </Button>
          </div>

                   {/* Footer */}
          <div className="mt-16 text-center animate-fade-in">
            <p className="text-gray-500 text-sm font-montserrat">
              © 2025 Academia MAGIS. Todos os direitos reservados.
            </p>
          </div>
       </div>
     </div>
  );
};

export default LinkPage;
