// AYRA — Lógica do Site
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
    fontSize = Math.min(130, fontSize + 5);
    document.documentElement.style.fontSize = fontSize + '%';
  });
  if (fontDown) fontDown.addEventListener('click', () => {
    fontSize = Math.max(80, fontSize - 5);
    document.documentElement.style.fontSize = fontSize + '%';
  });

  // ==== CONTRAST ====
  const contrastBtn = document.getElementById('contrastBtn');
  if (contrastBtn) contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  // ==== NEWSLETTER ====
  const newsForm = document.getElementById('newsForm');
  if (newsForm) newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = newsForm.querySelector('input');
    if (input && input.value) {
      alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
      input.value = '';
    }
  });

  // ==== VIDEO PROGRESS ====
  const playBtn = document.getElementById('playBtn');
  const pfill = document.getElementById('pfill');
  if (playBtn) {
    let playing = false, progress = 0, interval;
    playBtn.addEventListener('click', () => {
      if (!playing) {
        playing = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        interval = setInterval(() => {
          progress = Math.min(100, progress + 0.5);
          if (pfill) pfill.style.width = progress + '%';
          if (progress >= 100) {
            clearInterval(interval);
            playing = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
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

  // ==== SMOOTH SCROLL ====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  console.log('🌿 Ayra Marketplace — carregado!');
})();
