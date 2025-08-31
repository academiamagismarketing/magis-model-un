import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Instagram, 
  MessageSquare, 
  Heart,
  ExternalLink
} from 'lucide-react';
import logoBranca from '../../logo_branca_correta_footer.png';

const LinkPage = () => {
  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre a Academia MAGIS.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/academiamagis/', '_blank');
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
            <img 
              src={logoBranca} 
              alt="Academia MAGIS" 
              className="h-20 mx-auto"
            />
          </div>
          
          {/* Nome da empresa */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-sifonn">
            Academia MAGIS
          </h1>
          
          {/* Slogan */}
          <p className="text-gray-600 text-sm font-montserrat">
            Formando líderes para o futuro
          </p>
        </div>

        {/* Botão de contato WhatsApp no topo */}
        <div className="mb-6">
          <Button 
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 font-montserrat"
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
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 font-montserrat"
          >
            <Home className="w-5 h-5 mr-3" />
            Visite Nosso Site
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>

          {/* Instagram */}
          <Button 
            onClick={handleInstagram}
            variant="outline"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 font-montserrat"
          >
            <Instagram className="w-5 h-5 mr-3" />
            Siga-nos no Instagram
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>

          {/* Vakinha */}
          <Button 
            onClick={handleVakinha}
            variant="outline"
            className="w-full bg-red-600 hover:bg-red-700 text-white border-0 font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 font-montserrat"
          >
            <Heart className="w-5 h-5 mr-3" />
            Faça uma Doação
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-xs font-montserrat">
            © 2024 Academia MAGIS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
