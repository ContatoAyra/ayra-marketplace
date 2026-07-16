// ========================================
// AYRA — Banco de Dados do Site
// Todos os dados carregam as seções
// ========================================

window.AYRA_DATA = {
  // ======== PRODUTOS EM DESTAQUE ========
  products: [
    {
      id: 1,
      title: 'Farmácia e produtos de higiene',
      description: 'Medicamentos, vitaminas, dermocosméticos e produtos de cuidado pessoal com entrega recorrente.',
      price: 89.90,
      image: 'images/produto-farmacia.jpg',
      badge: 'Mais vendido'
    },
    {
      id: 2,
      title: 'Bolos e pães fresquinhos',
      description: 'Pães artesanais, bolos caseiros e quitutes entregues fresquinhos toda semana na sua casa.',
      price: 54.90,
      image: 'images/produto-paes.jpg',
      badge: 'Assinatura'
    },
    {
      id: 3,
      title: 'Cestas de mantimentos essenciais',
      description: 'Cestas básicas premium com itens selecionados, ideais para manter a despensa sempre abastecida.',
      price: 129.90,
      image: 'images/produto-cestas.jpg',
      badge: 'Kit completo'
    }
  ],

  // ======== SERVIÇOS ========
  services: [
    {
      id: 1,
      title: 'Motorista particular',
      description: 'Transporte porta a porta com motoristas treinados para atender com respeito e pontualidade.',
      icon: 'fa-car',
      image: 'images/servico-motorista.jpg'
    },
    {
      id: 2,
      title: 'Personal trainer / fisioterapeuta',
      description: 'Acompanhamento profissional para manter o corpo ativo com segurança na sua própria casa.',
      icon: 'fa-heart-pulse',
      image: 'images/servico-personal.jpg'
    },
    {
      id: 3,
      title: 'Concierge do dia a dia',
      description: 'Ajuda com agendamentos, contas, compras e tudo que você precisar. Seu assistente pessoal.',
      icon: 'fa-bell-concierge',
      image: 'images/servico-concierge.jpg'
    }
  ],

  // ======== ASSINATURAS ========
  subscriptions: [
    {
      id: 1,
      title: 'Café da manhã especial todo mês',
      description: 'Café gourmet, pães artesanais, geleias e quitutes selecionados chegando todo mês na sua porta.',
      price: 79.90,
      period: 'mês',
      badge: 'Mais popular',
      image: 'images/assinatura-cafe.jpg'
    },
    {
      id: 2,
      title: 'Flores em casa',
      description: 'Buquês frescos e arranjos exclusivos entregues semanalmente para alegrar seus ambientes.',
      price: 64.90,
      period: 'semana',
      badge: 'Novidade',
      image: 'images/assinatura-flores.jpg'
    },
    {
      id: 3,
      title: 'Cesta de frutas e orgânicos',
      description: 'Frutas da estação, verduras e orgânicos direto do produtor para sua mesa com frequência semanal.',
      price: 99.90,
      period: 'semana',
      badge: 'Saudável',
      image: 'images/assinatura-frutas.jpg'
    }
  ],

  // ======== CONTEÚDO E BLOG ========
  contents: [
    {
      id: 1,
      title: 'Santos — um passeio pela cidade',
      description: 'Explore os encantos da cidade de Santos, seus jardins, orla e cultura.',
      tag: 'Viagem',
      image: 'images/conteudo-santos.jpg',
      date: '12 jul 2026',
      readTime: '4 min'
    },
    {
      id: 2,
      title: 'Guia de eventos e cultura para a melhor idade',
      description: 'Teatros, concertos, exposições e programação cultural imperdível.',
      tag: 'Cultura',
      image: 'images/conteudo-teatro.jpg',
      date: '8 jul 2026',
      readTime: '6 min'
    },
    {
      id: 3,
      title: 'Cinema em casa — playlist de filmes imperdíveis',
      description: 'Seleção especial de filmes e séries para aproveitar no conforto do lar.',
      tag: 'Entretenimento',
      image: 'images/conteudo-cinema.jpg',
      date: '5 jul 2026',
      readTime: '3 min'
    }
  ],

  // ======== DEPOIMENTOS ========
  testimonials: [
    {
      id: 1,
      name: 'Helena Prado',
      location: 'Santos, SP',
      quote: 'A Ayra transformou minha rotina. Agora tenho mais tempo para o que realmente importa. O serviço de concierge é impecável.',
      image: 'images/depoimento-helena.jpg'
    },
    {
      id: 2,
      name: 'Roberto Almeida',
      location: 'Santos, SP',
      quote: 'Assinei o café da manhã e é uma alegria toda semana. Produtos fresquinhos, entrega pontual. Recomendo de olhos fechados.',
      image: 'images/depoimento-roberto.jpg'
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      location: 'São Vicente, SP',
      quote: 'O carinho com que cada detalhe é pensado faz toda a diferença. A curadoria é excepcional. Me sinto cuidada.',
      image: 'images/depoimento-maria.jpg'
    }
  ]
};
