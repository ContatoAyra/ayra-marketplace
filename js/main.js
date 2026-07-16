(function() {
  'use strict';

  const cart = JSON.parse(localStorage.getItem('ayraCart')) || [];
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartToggle = document.getElementById('cartToggle');
  const cartClose = document.getElementById('cartClose');
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  function saveCart() { localStorage.setItem('ayraCart', JSON.stringify(cart)); }
  function updateCart() {
    saveCart();
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    const count = cart.reduce((s,i) => s + i.qty, 0);
    if (cartCount) cartCount.textContent = count;
    if (cartTotal) cartTotal.textContent = 'R$ ' + total.toFixed(2).replace('.',',');
    if (cartFooter) cartFooter.style.display = count > 0 ? 'block' : 'none';
    renderCart();
  }
  function renderCart() {
    if (!cartItems) return;
    if (!cart.length) { cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>'; return; }
    cartItems.innerHTML = cart.map((item,i) => `
      <div class="cart-item">
        <img src="${item.img}" alt="" class="cart-item-img" onerror="this.style.display='none'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.',',')}</div>
          <div class="cart-item-qty">
            <button onclick="ayraCart.qty(${i},-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="ayraCart.qty(${i},1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="ayraCart.remove(${i})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('');
  }

  window.ayraCart = {
    add: (id, name, price, img) => {
      const e = cart.find(i => i.id === id);
      if (e) e.qty++; else cart.push({id,name,price,img,qty:1});
      updateCart(); toast('Adicionado ao carrinho!');
    },
    remove: i => { cart.splice(i,1); updateCart(); },
    qty: (i,d) => { cart[i].qty += d; if (cart[i].qty <= 0) cart.splice(i,1); updateCart(); }
  };

  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast show'; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(),300); }, 2000);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-cart');
    if (btn) {
      e.stopPropagation();
      const card = btn.closest('[data-id]');
      if (card) window.ayraCart.add(card.dataset.id, card.dataset.name, parseFloat(card.dataset.price), card.dataset.img || '');
    }
  });

  if (cartToggle) cartToggle.addEventListener('click', () => { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); });
  function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); }
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  updateCart();

  const checkoutBtn = document.getElementById('cartCheckout');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (!cart.length) return;
    const msg = cart.map(i => `${i.name} x${i.qty} = R$${(i.price*i.qty).toFixed(2)}`).join('\n');
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    window.open(`https://wa.me/5521999230233?text=Olá! Quero finalizar meu pedido:\n${msg}\n\nTotal: R$ ${total.toFixed(2).replace('.',',')}`, '_blank');
  });

  // CARROSSEL
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  const prev = document.getElementById('carPrev');
  const next = document.getElementById('carNext');
  let current = 0, totalSlides = dots.length, interval;

  function goTo(idx) {
    if (idx < 0) idx = totalSlides - 1;
    if (idx >= totalSlides) idx = 0;
    current = idx;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d,i) => d.classList.toggle('active', i === current));
  }
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));
  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  interval = setInterval(() => goTo(current + 1), 5000);

  // PRODUTOS DATA
  const produtos = [
    {id:1, cat:'Farmácia', name:'Vitaminas e Suplementos', desc:'Cálcio, vitamina D, ômega-3 e complexo B para saúde óssea e imunidade.', price:89.90, img:'images/produto-farmacia.jpg'},
    {id:2, cat:'Alimentos', name:'Cesta de Pães Artesanais', desc:'Pães sourdough, baguetes, croissants e quitutes fresquinhos entregues toda semana.', price:54.90, img:'images/produto-paes.jpg'},
    {id:3, cat:'Orgânicos', name:'Cesta de Frutas e Orgânicos', desc:'Frutas da estação, verduras e orgânicos direto do produtor para sua mesa.', price:99.90, img:'images/produto-cestas.jpg'},
    {id:4, cat:'Farmácia', name:'Dermocosméticos e Hidratantes', desc:'Linha premium de cuidados com a pele: hidratantes, protetores e sachês.', price:119.90, img:'images/produto-farmacia.jpg'},
    {id:5, cat:'Alimentos', name:'Café Gourmet em Grãos', desc:'Seleção de cafés especiais de diferentes regiões do Brasil, torra artesanal.', price:49.90, img:'images/assinatura-cafe.jpg'},
    {id:6, cat:'Bem-estar', name:'Kit Banho Seguro', desc:'Tapete antiderrapante, banco e barra de apoio para banho com segurança.', price:159.90, img:'images/produto-paes.jpg'}
  ];

  const grid = document.getElementById('produtosGrid');
  if (grid) grid.innerHTML = produtos.map(p => `
    <div class="card" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}">
      <img src="${p.img}" alt="" class="card-img" onerror="this.style.display='none'">
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-foot">
          <span class="price">R$ ${p.price.toFixed(2).replace('.',',')}</span>
          <button class="btn-sm add-cart">Adicionar</button>
        </div>
      </div>
    </div>
  `).join('');

  // ASSINATURAS
  const assinaturas = [
    {id:7, name:'Café da manhã especial', desc:'Café gourmet, pães, geleias e quitutes selecionados todo mês.', price:79.90, img:'images/assinatura-cafe.jpg', badge:'pop', badgeText:'Mais popular'},
    {id:8, name:'Flores em casa', desc:'Buquês frescos e arranjos exclusivos entregues semanalmente.', price:64.90, img:'images/assinatura-flores.jpg', badge:'novo', badgeText:'Novidade'},
    {id:9, name:'Cesta de frutas e orgânicos', desc:'Frutas da estação, verduras e orgânicos direto do produtor.', price:99.90, img:'images/assinatura-frutas.jpg', badge:'saudavel', badgeText:'Saudável'}
  ];
  const assGrid = document.getElementById('assinaturasGrid');
  if (assGrid) assGrid.innerHTML = assinaturas.map(a => `
    <div class="card-sub" data-id="${a.id}" data-name="${a.name}" data-price="${a.price}" data-img="${a.img}">
      <img src="${a.img}" alt="" onerror="this.style.display='none'">
      <div class="card-sub-body">
        <span class="sub-badge ${a.badge}">${a.badgeText}</span>
        <h3>${a.name}</h3>
        <p>${a.desc}</p>
        <span class="sub-price">R$ ${a.price.toFixed(2).replace('.',',')} <small>/mês</small></span>
        <button class="btn-sm add-cart" style="width:100%">Assinar</button>
      </div>
    </div>
  `).join('');

  // CONTEÚDO
  const conteudos = [
    {tag:'Viagem', title:'Santos — um passeio pela cidade', img:'images/conteudo-santos.jpg', meta:'12 jul 2026 · 4 min', text:'<p>Santos é uma cidade que encanta em cada esquina. Com sua orla de 7 km de extensão, os jardins da orla são considerados o maior jardim frontal de praia urbana do mundo.</p><p>O centro histórico abriga construções centenárias como a Bolsa Oficial do Café, o Museu do Café e o Teatro Coliseu. O bondinho turístico é uma experiência imperdível.</p><p>Para quem aprecia natureza, o Jardim Botânico e o Aquário Municipal são passeios que encantam pessoas de todas as idades.</p><p>Dica Ayra: o melhor horário para caminhar na orla é no final da tarde, quando o sol está mais suave e o pôr do sol colore o céu com tons dourados.</p>'},
    {tag:'Cultura', title:'Guia de eventos e cultura', img:'images/conteudo-cinema.jpg', meta:'8 jul 2026 · 6 min', text:'<p>A programação cultural de Santos está repleta de opções. O Teatro Municipal, o Sesc Santos e o Blue Med Convention Center recebem espetáculos durante todo o ano.</p><p>Peças teatrais, concertos, exposições e festivais de cinema fazem parte do calendário. Muitos teatros oferecem descontos especiais.</p><p>Destaques: concertos da Orquestra Sinfônica, mostras de cinema no Cine Roxy e exposições no Museu de Arte Contemporânea.</p>'},
    {tag:'Entretenimento', title:'Cinema em casa — filmes imperdíveis', img:'images/conteudo-santos.jpg', meta:'5 jul 2026 · 3 min', text:'<p>Preparamos uma seleção especial de filmes perfeitos para uma noite aconchegante. Clássicos como "Um Sonho de Liberdade", "Forrest Gump" e "A Vida é Bela" estão nas principais plataformas.</p><p>Para comédia leve: "O Grande Hotel Budapeste" e "Simplesmente Amor". Para documentários: "O Sal da Terra" e "Coco Antes de Chanel".</p><p>Dica Ayra: prepare uma xícara de chá, uma manta macia e aproveite cada momento.</p>'}
  ];
  const ctGrid = document.getElementById('conteudoGrid');
  if (ctGrid) ctGrid.innerHTML = conteudos.map((c,i) => `
    <div class="card-ct" data-content="${i}">
      <img src="${c.img}" alt="" onerror="this.style.display='none'">
      <div class="ct-body">
        <span class="ct-tag">${c.tag}</span>
        <h3>${c.title}</h3>
        <p>${c.meta}</p>
      </div>
    </div>
  `).join('');

  // DEPOIMENTOS
  const depoimentos = [
    {img:'images/depoimento-helena.jpg', quote:'A Ayra tornou meu dia a dia muito mais prático. O serviço de concierge é impecável.', author:'Helena Prado', local:'Santos, SP'},
    {img:'images/depoimento-roberto.jpg', quote:'As assinaturas são excelentes e os conteúdos sempre relevantes. Curadoria de primeira.', author:'Roberto Almeida', local:'Santos, SP'},
    {img:'images/depoimento-maria.jpg', quote:'Confio na curadoria da Ayra. Cada produto é pensado com carinho. Me sinto respeitada.', author:'Maria Oliveira', local:'São Vicente, SP'}
  ];
  const depGrid = document.getElementById('depoimentosGrid');
  if (depGrid) depGrid.innerHTML = depoimentos.map(d => `
    <div class="card-dep">
      <img src="${d.img}" alt="" onerror="this.style.display='none'">
      <blockquote>"${d.quote}"</blockquote>
      <div class="dep-author">${d.author}</div>
      <div class="dep-local">${d.local}</div>
    </div>
  `).join('');

  // MODAL CONTEÚDO
  const modalOverlay2 = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.card-ct').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.content);
      const c = conteudos[idx];
      if (!c) return;
      modalBody.innerHTML = `
        <span class="ct-tag">${c.tag}</span>
        <h2>${c.title}</h2>
        <img src="${c.img}" alt="" onerror="this.style.display='none'">
        ${c.text}
      `;
      modal.classList.add('open');
      modalOverlay2.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // MODAL PRODUTO
  document.querySelectorAll('#produtosGrid .card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const p = produtos.find(x => x.id === id);
      if (!p) return;
      modalBody.innerHTML = `
        <img src="${p.img}" alt="" onerror="this.style.display='none'">
        <span class="ct-tag">${p.cat}</span>
        <h2>${p.name}</h2>
        <p>${p.desc}</p>
        <span class="price-lg">R$ ${p.price.toFixed(2).replace('.',',')}</span>
        <button class="btn-primary add-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}">Adicionar ao carrinho <i class="fas fa-shopping-bag"></i></button>
      `;
      modal.classList.add('open');
      modalOverlay2.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modalOverlay2.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay2) modalOverlay2.addEventListener('click', closeModal);

  // NEWSLETTER
  const newsForm = document.getElementById('newsForm');
  if (newsForm) newsForm.addEventListener('submit', e => {
    e.preventDefault();
    toast('Inscrição realizada com sucesso!');
    newsForm.querySelector('input').value = '';
  });

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // NAV SCROLL
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

  console.log('🌿 Ayra carregado');
})();
