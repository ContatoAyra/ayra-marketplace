// ========================================
// AYRA — Lógica do Site
// Renderiza dados, controles e interações
// ========================================

(function() {
  'use strict';

  const data = window.AYRA_DATA;

  // ----- RENDERIZAÇÃO -----

  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid || !data.products) return;
    grid.innerHTML = data.products.map(p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}" class="product-card-image"
             onerror="this.parentElement.querySelector('.product-card-body').style.paddingTop='20px'; this.style.display='none'">
        <div class="product-card-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="product-card-footer">
            <span class="product-price">R$ ${p.price.toFixed(2)}</span>
            <button class="product-btn">Adicionar</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid || !data.services) return;
    grid.innerHTML = data.services.map(s => `
      <div class="service-card">
        <img src="${s.image}" alt="${s.title}"
             onerror="this.style.display='none'">
        <div class="service-card-overlay">
          <div class="service-icon"><i class="fas ${s.icon}"></i></div>
          <h3>${s.title}</h3>
          <p>${s.description}</p>
        </div>
      </div>
    `).join('');
  }

  function renderSubscriptions() {
    const grid = document.getElementById('subscriptionsGrid');
    if (!grid || !data.subscriptions) return;
    grid.innerHTML = data.subscriptions.map(s => `
      <div class="subscription-card">
        <img src="${s.image}" alt="${s.title}"
             onerror="this.style.display='none'">
        <div class="subscription-card-body">
          <span class="sub-badge">${s.badge}</span>
          <h3>${s.title}</h3>
          <p>${s.description}</p>
          <span class="sub-price">R$ ${s.price.toFixed(2)} <small>/${s.period}</small></span>
        </div>
      </div>
    `).join('');
  }

  function renderContents() {
    const grid = document.getElementById('contentGrid');
    if (!grid || !data.contents) return;
    grid.innerHTML = data.contents.map(c => `
      <div class="content-card">
        <img src="${c.image}" alt="${c.title}"
             onerror="this.style.display='none'">
        <div class="content-card-body">
          <span class="content-tag">${c.tag}</span>
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <div class="content-meta">
            <span>${c.date}</span>
            <span>·</span>
            <span>${c.readTime} de leitura</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid || !data.testimonials) return;
    grid.innerHTML = data.testimonials.map(t => `
      <div class="testimonial-card">
        <img src="${t.image}" alt="${t.name}" class="testimonial-avatar"
             onerror="this.style.display='none'">
        <blockquote>${t.quote}</blockquote>
        <div class="testimonial-author">${t.name}</div>
        <div class="testimonial-location">${t.location}</div>
      </div>
    `).join('');
  }

  function initRenders() {
    renderProducts();
    renderServices();
    renderSubscriptions();
    renderContents();
    renderTestimonials();
  }

  // ----- NAVEGAÇÃO -----

  function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ----- FONT SIZE (acessibilidade) -----

  function initFontControls() {
    const decreaseBtn = document.getElementById('decreaseFont');
    const increaseBtn = document.getElementById('increaseFont');
    let currentSize = 100;

    function applySize() {
      document.documentElement.style.fontSize = currentSize + '%';
    }

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        currentSize = Math.max(80, currentSize - 5);
        applySize();
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        currentSize = Math.min(130, currentSize + 5);
        applySize();
      });
    }
  }

  // ----- ALTO CONTRASTE -----

  function initContrast() {
    const btn = document.getElementById('contrastToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  }

  // ----- NEWSLETTER -----

  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
        input.value = '';
      }
    });
  }

  // ----- VÍDEO -----

  function initVideo() {
    const playBtn = document.getElementById('playVideo');
    const progressFill = document.querySelector('.progress-fill');
    if (!playBtn) return;

    let isPlaying = false;
    let progress = 0;
    let interval;

    playBtn.addEventListener('click', () => {
      if (!isPlaying) {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        interval = setInterval(() => {
          progress = Math.min(100, progress + 0.5);
          if (progressFill) progressFill.style.width = progress + '%';
          if (progress >= 100) {
            clearInterval(interval);
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
          }
        }, 100);
      } else {
        isPlaying = false;
        clearInterval(interval);
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }

  // ----- SMOOTH SCROLL -----

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ----- HERO FADE-IN -----

  function initHeroImage() {
    const img = document.getElementById('heroImg');
    const placeholder = document.getElementById('heroPlaceholder');
    if (img && placeholder) {
      img.addEventListener('load', () => {
        placeholder.style.display = 'none';
        img.style.display = 'block';
      });
      img.addEventListener('error', () => {
        placeholder.style.display = 'flex';
        img.style.display = 'none';
      });
    }
  }

  // ----- INICIALIZAÇÃO -----

  document.addEventListener('DOMContentLoaded', () => {
    initRenders();
    initNavbar();
    initFontControls();
    initContrast();
    initNewsletter();
    initVideo();
    initSmoothScroll();
    initHeroImage();
    console.log('🌿 Ayra Marketplace — site carregado com sucesso!');
  });

})();
