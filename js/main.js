(function() {
  'use strict';

  // ==== CARRINHO ====
  let cart = JSON.parse(localStorage.getItem('ayraCart')) || [];
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

  // ==== CARROSSEL ====
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');
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
  dots.forEach(d => d.addEventListener('click', () => { clearInterval(interval); goTo(parseInt(d.dataset.index)); interval = setInterval(() => goTo(current + 1), 5000); }));
  if (prev) prev.addEventListener('click', () => { clearInterval(interval); goTo(current - 1); interval = setInterval(() => goTo(current + 1), 5000); });
  if (next) next.addEventListener('click', () => { clearInterval(interval); goTo(current + 1); interval = setInterval(() => goTo(current + 1), 5000); });
  interval = setInterval(() => goTo(current + 1), 5000);

  // ==== PRODUTOS ====
  const produtos = [
    {id:1, cat:'Farmácia', name:'Vitaminas e Suplementos', desc:'Cálcio, vitamina D, ômega-3 e complexo B para saúde óssea e imunidade.', price:89.90, img:'images/produto-farmacia.jpg'},
    {id:2, cat:'Alimentos', name:'Pães Artesanais Fresquinhos', desc:'Sourdough, baguetes, croissants e quitutes entregues toda semana.', price:54.90, img:'images/produto-paes.jpg'},
    {id:3, cat:'Orgânicos', name:'Cesta de Frutas e Orgânicos', desc:'Frutas da estação, verduras e orgânicos direto do produtor.', price:99.90, img:'images/produto-cestas.jpg'},
    {id:4, cat:'Farmácia', name:'Dermocosméticos Premium', desc:'Hidratantes, protetores solares e sachês para cuidados com a pele.', price:119.90, img:'images/produto-farmacia.jpg'},
    {id:5, cat:'Bem-estar', name:'Kit Segurança para Banho', desc:'Tapete antiderrapante, banco e barra de apoio para banho seguro.', price:159.90, img:'images/produto-paes.jpg'},
    {id:6, cat:'Alimentos', name:'Café Gourmet em Grãos', desc:'Cafés especiais de diferentes regiões do Brasil, torra artesanal.', price:49.90, img:'images/assinatura-cafe.jpg'}
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

  // ==== ASSINATURAS ====
  const assinaturas = [
    {id:7, name:'Café da manhã especial', desc:'Café gourmet, pães, geleias e quitutes todo mês.', price:79.90, img:'images/assinatura-cafe.jpg', badge:'pop', badgeText:'Mais popular'},
    {id:8, name:'Flores em casa', desc:'Buquês frescos entregues semanalmente para alegrar seus ambientes.', price:64.90, img:'images/assinatura-flores.jpg', badge:'novo', badgeText:'Novidade'},
    {id:9, name:'Cesta de frutas e orgânicos', desc:'Frutas da estação, verduras e orgânicos toda semana.', price:99.90, img:'images/assinatura-frutas.jpg', badge:'saudavel', badgeText:'Saudável'}
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

  // ==== CONTEÚDO ====
  const conteudos = [
    {tag:'Viagem', title:'Santos — um passeio pela cidade', img:'images/conteudo-santos.jpg', meta:'12 jul 2026 · 4 min', text:'<p>Santos é uma cidade que encanta em cada esquina. Com sua orla de 7 km de extensão, os jardins da orla são o maior jardim frontal de praia urbana do mundo.</p><p>O centro histórico abriga a Bolsa Oficial do Café, o Museu do Café e o Teatro Coliseu.</p><p>O Jardim Botânico e o Aquário Municipal são passeios imperdíveis.</p><p>Dica Ayra: caminhe na orla no final da tarde para ver o pôr do sol dourado.</p>'},
    {tag:'Cultura', title:'Guia de eventos e cultura em Santos', img:'images/conteudo-santos.jpg', meta:'8 jul 2026 · 6 min', text:'<p>A programação cultural de Santos está repleta de opções. O Teatro Municipal, Sesc e Blue Med recebem espetáculos todo ano.</p><p>Peças, concertos, exposições e festivais. Muitos teatros oferecem descontos especiais.</p><p>Destaques: Orquestra Sinfônica, Cine Roxy e Museu de Arte Contemporânea.</p>'},
    {tag:'Entretenimento', title:'Cinema em casa — filmes imperdíveis', img:'images/conteudo-cinema.jpg', meta:'5 jul 2026 · 3 min', text:'<p>Clássicos como "Um Sonho de Liberdade", "Forrest Gump" e "A Vida é Bela" estão nas plataformas.</p><p>Comédia: "O Grande Hotel Budapeste" e "Simplesmente Amor". Documentários: "O Sal da Terra".</p><p>Dica Ayra: prepare uma xícara de chá e aproveite.</p>'}
  ];
  const ctGrid = document.getElementById('conteudoGrid');
  if (ctGrid) ctGrid.innerHTML = conteudos.map((c,i) => `
    <div class="card-ct" data-content="${i}" style="border-radius:12px;overflow:hidden;cursor:pointer;transition:all 0.3s ease;">
      <img src="${c.img}" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#f0f0f0" onerror="this.style.display='none'">
      <div style="padding:12px 0">
        <span style="font-size:0.65rem;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:1px">${c.tag}</span>
        <h3 style="font-size:0.9rem;font-weight:600;margin:4px 0;color:var(--gray-900)">${c.title}</h3>
        <p style="font-size:0.78rem;color:var(--gray-600)">${c.meta}</p>
      </div>
    </div>
  `).join('');

  // ==== DEPOIMENTOS ====
  const depoimentos = [
    {img:'images/depoimento-helena.jpg', quote:'A Ayra tornou meu dia a dia mais prático. O concierge é impecável.', author:'Helena Prado', local:'Santos, SP'},
    {img:'images/depoimento-roberto.jpg', quote:'Assinaturas excelentes e conteúdos relevantes. Curadoria de primeira.', author:'Roberto Almeida', local:'Santos, SP'},
    {img:'images/depoimento-maria.jpg', quote:'Confio na curadoria da Ayra. Cada produto é pensado com carinho.', author:'Maria Oliveira', local:'São Vicente, SP'}
  ];
  const depGrid = document.getElementById('depoimentosGrid');
  if (depGrid) depGrid.innerHTML = depoimentos.map(d => `
    <div style="text-align:center;padding:32px 20px">
      <img src="${d.img}" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:12px;background:#f0f0f0" onerror="this.style.display='none'">
      <blockquote style="font-size:0.85rem;line-height:1.6;color:var(--gray-600);font-style:italic;margin-bottom:12px">"${d.quote}"</blockquote>
      <div style="font-weight:600;font-size:0.85rem;color:var(--gray-900)">${d.author}</div>
      <div style="font-size:0.75rem;color:var(--gray-400)">${d.local}</div>
    </div>
  `).join('');

  // ==== MODAL (CONTEÚDO) ====
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-content]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.content);
      const c = conteudos[idx];
      if (!c) return;
      modalBody.innerHTML = `
        <span style="font-size:0.65rem;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:1px">${c.tag}</span>
        <h2>${c.title}</h2>
        <img src="${c.img}" alt="" onerror="this.style.display='none'">
        ${c.text}
      `;
      abrirModal();
    });
  });

  function abrirModal() { modal.classList.add('open'); modalOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function fecharModal() { modal.classList.remove('open'); modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  if (modalClose) modalClose.addEventListener('click', fecharModal);
  if (modalOverlay) modalOverlay.addEventListener('click', fecharModal);

  // ==== MODAL (PRODUTO) ====
  document.querySelectorAll('#produtosGrid .card').forEach(card => {
    card.addEventListener('click', function() {
      const id = parseInt(this.dataset.id);
      const p = produtos.find(x => x.id === id);
      if (!p) return;
      modalBody.innerHTML = `
        <img src="${p.img}" alt="" onerror="this.style.display='none'" style="width:100%;border-radius:8px;margin-bottom:14px">
        <span style="font-size:0.65rem;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:1px">${p.cat}</span>
        <h2 style="font-size:1.3rem;color:var(--green-dark);margin:8px 0">${p.name}</h2>
        <p style="font-size:0.85rem;line-height:1.7;color:var(--gray-600);margin-bottom:12px">${p.desc}</p>
        <div style="font-size:1.2rem;font-weight:700;color:var(--gold);margin-bottom:14px">R$ ${p.price.toFixed(2).replace('.',',')}</div>
        <button class="btn-primary add-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}" style="width:100%;justify-content:center">Adicionar ao carrinho</button>
      `;
      abrirModal();
    });
  });

  // ==== NEWSLETTER ====
  const newsForm = document.getElementById('newsForm');
  if (newsForm) newsForm.addEventListener('submit', e => {
    e.preventDefault();
    toast('Inscrição realizada com sucesso!');
    newsForm.querySelector('input').value = '';
  });

  // ==== SMOOTH SCROLL ====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // ==== NAV SCROLL ====
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

  console.log('🌿 Ayra carregado');
})();
