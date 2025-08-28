import React from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Star, 
  Award, 
  Heart,
  MessageSquare,
  CheckCircle,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pinsImage from '@/assets/imagens/6.jpg';
import pinsCollectionImage from '@/assets/imagens/9.jpg';

const Produtos = () => {
  const navigate = useNavigate();

  const handleWhatsApp = (collection: string) => {
    const message = `Olá! Gostaria de adquirir a coleção de produtos "${collection}" da Academia MAGIS. Pode me enviar mais informações sobre preços e formas de pagamento?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  const productCollections = [
    {
      id: 1,
      name: "Coleção Diplomática",
      description: "Produtos exclusivos com símbolos diplomáticos e da ONU",
      price: "R$ 45,00",
      items: ["Pin ONU", "Pin Diplomático", "Pin Bandeira Brasileira"],
      badge: "Mais Popular"
    },
    {
      id: 2,
      name: "Coleção Acadêmica",
      description: "Produtos para estudantes e acadêmicos de relações internacionais",
      price: "R$ 35,00",
      items: ["Pin Graduação", "Pin Mestrado", "Pin Doutorado"],
      badge: "Lançamento"
    },
    {
      id: 3,
      name: "Coleção Especial",
      description: "Produtos limitados e edições especiais da Academia MAGIS",
      price: "R$ 55,00",
      items: ["Pin Edição Limitada", "Pin Comemorativo", "Pin Especial"],
      badge: "Edição Limitada"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Produtos fabricados com materiais de alta qualidade e acabamento profissional"
    },
    {
      icon: Heart,
      title: "Design Exclusivo",
      description: "Criados especialmente para a Academia MAGIS com designs únicos"
    },
    {
      icon: Package,
      title: "Entrega Segura",
      description: "Embalagem especial e entrega segura para todo o Brasil"
    },
    {
      icon: CheckCircle,
      title: "Garantia",
      description: "Garantia de qualidade e satisfação total com sua compra"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Estudante de RI",
      text: "Os produtos da Academia MAGIS são lindos! Qualidade excepcional e design único. Recomendo muito!"
    },
    {
      name: "João Santos",
      role: "Delegado",
      text: "Comprei a coleção diplomática e adorei! Os produtos são perfeitos para usar em eventos e simulações."
    },
    {
      name: "Ana Costa",
      role: "Professora",
      text: "Excelente qualidade e entrega rápida. Os produtos são um ótimo presente para estudantes de relações internacionais."
    }
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={pinsImage} 
              alt="Produtos Academia MAGIS" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/50"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Produtos Exclusivos
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Colecione produtos únicos da Academia MAGIS e leve consigo um pedaço 
                da diplomacia e das relações internacionais.
              </p>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Nossas Coleções
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubra nossas coleções exclusivas de produtos, cada uma com designs únicos 
                que representam a excelência da Academia MAGIS.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCollections.map((collection) => (
                <Card key={collection.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-diplomatic border-0 bg-card">
                  <div className="relative overflow-hidden">
                    <img 
                      src={pinsCollectionImage} 
                      alt={collection.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-diplomatic"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {collection.badge}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-montserrat group-hover:text-primary transition-smooth">
                      {collection.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {collection.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Inclui:</h4>
                      <ul className="space-y-1">
                        {collection.items.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">
                        {collection.price}
                      </div>
                      <Button 
                        onClick={() => handleWhatsApp(collection.name)}
                        className="btn-outline"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Por que Escolher Nossos Produtos?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Qualidade, exclusividade e design único em cada produto da Academia MAGIS.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-background p-8 rounded-2xl shadow-diplomatic text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                O que Dizem Nossos Clientes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Depoimentos de quem já adquiriu nossos produtos exclusivos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-muted p-8 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Adquira Seus Produtos Exclusivos
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Colecione produtos únicos da Academia MAGIS e leve consigo um pedaço 
              da diplomacia e das relações internacionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleWhatsApp("Coleção Diplomática")}
                size="lg"
                variant="outline"
                className="btn-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
                variant="outline"
                className="btn-white"
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

export default Produtos;
