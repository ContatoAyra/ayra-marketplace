// AYRA — Lógica Completa do Site
(function () {
  'use strict';

  // ==== NAVBAR SCROLL ====
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ==== FONT SIZE ====
  let fontSize = 100;
  const fontUp = document.getElementById('fontUp');
  const fontDown = document.getElementById('fontDown');
  if (fontUp) fontUp.addEventListener('click', () => {
    fontSize = Math.min(140, fontSize + 5);
    document.documentElement.style.fontSize = fontSize + '%';
  });
  if (fontDown) fontDown.addEventListener('click', () => {
    fontSize = Math.max(75, fontSize - 5);
    document.documentElement.style.fontSize = fontSize + '%';
  });

  // ==== CONTRAST ====
  const contrastBtn = document.getElementById('contrastBtn');
  if (contrastBtn) contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  // ==== MOBILE MENU ====
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobileMenu';
    mobileMenu.innerHTML = '<a href="#membros" class="nav-link">Membros</a><a href="#produtos" class="nav-link">Produtos</a><a href="#servicos" class="nav-link">Serviços</a><a href="#conteudo" class="nav-link">Conteúdo</a>';
    document.body.appendChild(mobileMenu);
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('#mobileMenu .nav-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

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

  function updateCart() {
    localStorage.setItem('ayraCart', JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = count;
    if (cartTotal) cartTotal.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    if (cartFooter) cartFooter.style.display = count > 0 ? 'block' : 'none';
    renderCart();
  }

  function renderCart() {
    if (!cartItems) return;
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
      return;
    }
    cartItems.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.style.display='none'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.',',')}</div>
          <div class="cart-item-qty">
            <button onclick="window.ayraCart.qty(${i},-1)">-</button>
            <span>${item.qty}</span>
            <button onclick="window.ayraCart.qty(${i},1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="window.ayraCart.remove(${i})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('');
  }

  window.ayraCart = {
    add: (id, name, price, img) => {
      const existing = cart.find(item => item.id === id);
      if (existing) { existing.qty++; }
      else { cart.push({ id, name, price, img, qty: 1 }); }
      updateCart();
      showToast('Adicionado ao carrinho!');
    },
    remove: (i) => {
      cart.splice(i, 1);
      updateCart();
    },
    qty: (i, delta) => {
      cart[i].qty += delta;
      if (cart[i].qty <= 0) cart.splice(i, 1);
      updateCart();
    }
  };

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast show';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2000);
  }

  // Event listeners do carrinho
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('[data-id]');
      if (card) {
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img || '';
        window.ayraCart.add(id, name, price, img);
      }
    });
  });

  if (cartToggle) cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
  });

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  updateCart();

  // ==== CHECKOUT ====
  const checkoutBtn = document.getElementById('cartCheckout');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = cart.map(i => `${i.name} x${i.qty} = R$${(i.price*i.qty).toFixed(2)}`).join('\n');
    const whatsapp = `https://wa.me/5521999230233?text=Olá! Quero finalizar minha compra:\n\n${msg}\n\nTotal: R$ ${total.toFixed(2).replace('.',',')}`;
    window.open(whatsapp, '_blank');
  });

  // ==== NEWSLETTER ====
  const newsForm = document.getElementById('newsForm');
  if (newsForm) newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = newsForm.querySelector('input');
    if (input && input.value) {
      showToast('Inscrição realizada com sucesso!');
      input.value = '';
    }
  });

  // ==== VÍDEO ====
  const playBtn = document.getElementById('playBtn');
  const pfill = document.getElementById('pfill');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');
  if (playBtn) {
    let playing = false, progress = 0, interval;
    playBtn.addEventListener('click', () => {
      if (!playing) {
        playing = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        interval = setInterval(() => {
          progress = Math.min(100, progress + 0.5);
          if (pfill) pfill.style.width = progress + '%';
          if (timeCurrent) {
            const secs = Math.floor(progress / 100 * 105);
            const m = Math.floor(secs / 60);
            const s = secs % 60;
            timeCurrent.textContent = m + ':' + String(s).padStart(2, '0');
          }
          if (progress >= 100) {
            clearInterval(interval);
            playing = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            progress = 0;
            if (pfill) pfill.style.width = '0%';
            if (timeCurrent) timeCurrent.textContent = '0:00';
          }
        }, 100);
      } else {
        playing = false;
        clearInterval(interval);
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }

  // ==== HERO IMAGE FALLBACK ====
  const heroImg = document.getElementById('heroImg');
  const heroPlaceholder = document.getElementById('heroPlaceholder');
  if (heroImg && heroPlaceholder) {
    heroImg.addEventListener('load', () => { heroPlaceholder.style.display = 'none'; });
    heroImg.addEventListener('error', () => { heroPlaceholder.style.display = 'flex'; heroImg.style.display = 'none'; });
  }

  // ==== MODAL CONTEÚDO ====
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const conteudos = {
    santos: {
      tag: 'Viagem',
      title: 'Santos — um passeio pela cidade',
      img: 'images/conteudo-santos.jpg',
      text: `<p>Santos é uma cidade que encanta em cada esquina. Com sua orla de 7 km de extensão, os jardins da orla são considerados o maior jardim frontal de praia urbana do mundo, segundo o Guinness Book.</p>
      <p>O centro histórico abriga construções centenárias, como a Bolsa Oficial do Café, o Museu do Café e o Teatro Coliseu. O bondinho turístico é uma experiência imperdível para quem quer conhecer a história da cidade.</p>
      <p>Para quem aprecia natureza, o Jardim Botânico e o Acquário Municipal são passeios que encantam pessoas de todas as idades. A cidade respira história e cultura.</p>
      <p>Dica Ayra: o melhor horário para caminhar na orla é no final da tarde, quando o sol está mais suave e o pôr do sol colore o céu com tons dourados.</p>`
    },
    teatro: {
      tag: 'Cultura',
      title: 'Guia de eventos e cultura para a melhor idade',
      img: 'images/conteudo-teatro.jpg',
      text: `<p>A programação cultural de Santos e região está repleta de opções para quem aprecia arte, música e teatro. O Teatro Municipal, o Sesc Santos e o Blue Med Convention Center recebem espetáculos durante todo o ano.</p>
      <p>Peças teatrais, concertos de música clássica, exposições de arte e festivais de cinema fazem parte do calendário cultural da região. Muitos teatros oferecem meia-entrada e descontos especiais para pessoas 65+.</p>
      <p>Destaques da temporada: concertos da Orquestra Sinfônica, mostras de cinema no Cine Roxy e exposições no Museu de Arte Contemporânea.</p>
      <p>Confira sempre a programação com antecedência e garanta seus ingressos. Muitos eventos têm lotação limitada.</p>`
    },
    cinema: {
      tag: 'Entretenimento',
      title: 'Cinema em casa — filmes imperdíveis',
      img: 'images/conteudo-cinema.jpg',
      text: `<p>Preparamos uma seleção especial de filmes e séries perfeitos para uma noite aconchegante no conforto do lar. São histórias que emocionam, fazem rir e pensar.</p>
      <p>Para quem ama dramas emocionantes: "Um Sonho de Liberdade", "Forrest Gump" e "A Vida é Bela" são clássicos que nunca saem de moda e estão disponíveis nas principais plataformas de streaming.</p>
      <p>Para quem prefere comédia leve: "O Grande Hotel Budapeste", "Midnight in Paris" e "Simplesmente Amor" trazem histórias encantadoras com elencos memoráveis.</p>
      <p>E para os fãs de documentários: "O Sal da Terra", "A 13ª Emenda" e "Coco Antes de Chanel" são verdadeiras aulas de vida.</p>
      <p>Dica Ayra: prepare uma xícara de chá, uma manta macia e aproveite cada momento. O cinema é uma janela para o mundo.</p>`
    }
  };

  document.querySelectorAll('.card-content').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.content;
      const c = conteudos[key];
      if (!c) return;
      modalBody.innerHTML = `
        <span class="tag">${c.tag}</span>
        <h2>${c.title}</h2>
        ${c.img ? `<img src="${c.img}" alt="${c.title}" onerror="this.style.display='none'">` : ''}
        ${c.text}
      `;
      modalContent.classList.add('open');
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalContent.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // ==== SMOOTH SCROLL ====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ==== SEARCH ====
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        const q = searchInput.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.card, .card-sub, .card-service, .card-content');
        let found = false;
        cards.forEach(c => {
          const text = c.textContent.toLowerCase();
          if (text.includes(q)) {
            c.scrollIntoView({ behavior: 'smooth', block: 'center' });
            c.style.outline = '3px solid var(--gold)';
            setTimeout(() => c.style.outline = '', 2000);
            found = true;
          }
        });
        if (!found) showToast('Nenhum resultado encontrado para "' + q + '"');
      }
    });
  }

  console.log('🌿 Ayra Marketplace — carregado com sucesso!');
})();
