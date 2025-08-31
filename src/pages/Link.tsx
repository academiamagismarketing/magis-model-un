import React from 'react';
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
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Container principal */}
      <div className="max-w-md mx-auto px-6 py-8">
        
                 {/* Header com logo e informações */}
         <div className="text-center mb-8">
                       {/* Logo */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center p-2">
                <img 
                  src={logoPreta} 
                  alt="Academia MAGIS" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
           
           {/* Nome da empresa */}
           <h1 className="text-2xl font-bold text-gray-900 mb-2 font-sifonn">
             Academia MAGIS
           </h1>
           
           {/* Slogan */}
           <p className="text-gray-600 text-sm font-montserrat mb-4">
             Formando líderes para o futuro
           </p>

           {/* Ícones de redes sociais */}
           <div className="flex justify-center space-x-6 mb-6">
                           {/* WhatsApp */}
              <button
                onClick={handleWhatsAppIcon}
                className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </button>
             
             {/* Instagram */}
             <button
               onClick={handleInstagram}
               className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
             >
               <Instagram className="w-6 h-6 text-white" />
             </button>
           </div>
         </div>

                 {/* Botão de contato WhatsApp no topo */}
         <div className="mb-6">
           <Button 
             onClick={handleWhatsApp}
             className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-montserrat border-b-4 border-green-800 hover:border-green-900"
           >
             <MessageSquare className="w-5 h-5 mr-3" />
             Fale Conosco no WhatsApp
           </Button>
         </div>

                 {/* Links principais */}
         <div className="space-y-4">
           {/* Site Principal */}
           <Button 
             onClick={handleSite}
             variant="outline"
             className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-montserrat border-b-4 border-gray-400 hover:border-gray-500"
           >
             <Home className="w-5 h-5 mr-3" />
             Visite Nosso Site
             <ExternalLink className="w-4 h-4 ml-2" />
           </Button>

           {/* Vakinha */}
           <Button 
             onClick={handleVakinha}
             variant="outline"
             className="w-full bg-red-600 hover:bg-red-700 text-white border-0 font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-montserrat border-b-4 border-red-800 hover:border-red-900"
           >
             <Heart className="w-5 h-5 mr-3" />
             Faça uma Doação
             <ExternalLink className="w-4 h-4 ml-2" />
           </Button>
         </div>

                 {/* Footer */}
         <div className="mt-12 text-center">
           <p className="text-gray-500 text-xs font-montserrat">
             © 2025 Academia MAGIS. Todos os direitos reservados.
           </p>
         </div>
      </div>
    </div>
  );
};

export default LinkPage;
