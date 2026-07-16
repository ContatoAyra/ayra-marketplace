(async function() {
  'use strict';
  const r = await fetch('data.json'), D = await r.json();

  // LOGO
  document.getElementById('logoPlace').innerHTML = (D.site.logo || '') + '<span class="logo-text">' + D.site.nome + '</span>';

  // MENU
  document.getElementById('navLinks').innerHTML = D.menu.map(m => '<a href="' + m.href + '" class="nav-link">' + m.rotulo + '</a>').join('');

  // CARROSSEL
  const track = document.getElementById('carouselTrack');
  track.innerHTML = D.slides.map(s => {
    const bg = s.img ? '<img src="' + s.img + '" alt="" class="slide-bg" onerror="this.style.display=\'none\'">' : '<div class="slide-bg" style="background:linear-gradient(' + s.grad + ')"></div>';
    return '<div class="slide">' + bg + '<div class="slide-overlay"></div><div class="slide-content"><span class="slide-tag">' + s.tag + '</span><h1>' + s.titulo + '</h1><p>' + s.texto + '</p><a href="' + s.btn.href + '" class="btn-primary">' + s.btn.texto + ' <i class="fas fa-arrow-right"></i></a></div></div>';
  }).join('');
  const dots = document.getElementById('carouselDots');
  dots.innerHTML = D.slides.map((_, i) => '<button class="dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></button>').join('');
  let c = 0, t = D.slides.length, iv;
  function go(i) { if (i < 0) i = t - 1; if (i >= t) i = 0; c = i; track.style.transform = 'translateX(-' + (c * 100) + '%)'; dots.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === c)); }
  dots.querySelectorAll('.dot').forEach(d => d.addEventListener('click', () => { clearInterval(iv); go(parseInt(d.dataset.index)); iv = setInterval(() => go(c + 1), 5000); }));
  document.getElementById('carPrev').addEventListener('click', () => { clearInterval(iv); go(c - 1); iv = setInterval(() => go(c + 1), 5000); });
  document.getElementById('carNext').addEventListener('click', () => { clearInterval(iv); go(c + 1); iv = setInterval(() => go(c + 1), 5000); });
  iv = setInterval(() => go(c + 1), 5000);

  // PRODUTOS
  document.getElementById('produtosGrid').innerHTML = D.produtos.map(p => '<div class="card" data-id="' + p.id + '" data-name="' + p.nome + '" data-price="' + p.preco + '" data-img="' + p.img + '"><img src="' + p.img + '" alt="" onerror="this.style.display=\'none\'"><div class="card-body"><div class="card-cat">' + p.cat + '</div><h3>' + p.nome + '</h3><p>' + p.desc + '</p><div class="card-foot"><span class="price">R$ ' + p.preco.toFixed(2).replace('.', ',') + '</span><button class="btn-sm add-cart">Adicionar</button></div></div></div>').join('');

  // SERVIÇOS
  document.getElementById('servicosGrid').innerHTML = D.servicos.map(s => '<div class="svc-card"><div class="svc-icon"><i class="fas ' + s.icone + '"></i></div><h3>' + s.titulo + '</h3><p>' + s.desc + '</p></div>').join('');

  // ASSINATURAS
  document.getElementById('assinaturasGrid').innerHTML = D.assinaturas.map(a => '<div class="card-sub" data-id="' + a.id + '" data-name="' + a.nome + '" data-price="' + a.preco + '" data-img="' + a.img + '"><img src="' + a.img + '" alt="" onerror="this.style.display=\'none\'"><div class="card-sub-body"><span class="sub-badge ' + a.badge + '">' + a.badge_txt + '</span><h3>' + a.nome + '</h3><p>' + a.desc + '</p><span class="sub-price">R$ ' + a.preco.toFixed(2).replace('.', ',') + ' <small>/mês</small></span><button class="btn-sm add-cart" style="width:100%">Assinar</button></div></div>').join('');

  // CONTEÚDO
  document.getElementById('conteudoGrid').innerHTML = D.conteudos.map((c, i) => '<div class="card-ct" data-idx="' + i + '" style="border-radius:12px;overflow:hidden;cursor:pointer;transition:all 0.3s ease"><img src="' + c.img + '" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#f0f0f0" onerror="this.style.display=\'none\'"><div style="padding:12px 0"><span style="font-size:0.65rem;font-weight:600;color:#C8A25A;text-transform:uppercase;letter-spacing:1px">' + c.cat + '</span><h3 style="font-size:0.9rem;font-weight:600;margin:4px 0;color:#333">' + c.titulo + '</h3><p style="font-size:0.78rem;color:#666">' + c.data + ' · ' + c.min + ' min</p></div></div>').join('');

  // DEPOIMENTOS
  document.getElementById('depoimentosGrid').innerHTML = D.depoimentos.map(d => '<div style="text-align:center;padding:32px 20px"><img src="' + d.img + '" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:12px;background:#f0f0f0" onerror="this.style.display=\'none\'"><blockquote style="font-size:0.85rem;line-height:1.6;color:#666;font-style:italic;margin-bottom:12px">"' + d.frase + '"</blockquote><div style="font-weight:600;font-size:0.85rem;color:#333">' + d.autor + '</div><div style="font-size:0.75rem;color:#999">' + d.local + '</div></div>').join('');

  // FOOTER
  const fg = document.getElementById('footerGrid');
  fg.innerHTML = '<div><svg width="28" height="28" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="#C8A25A"/><path d="M50 20C38 20 28 30 28 42s10 22 22 22 22-10 22-22-10-22-22-22z" fill="#1E3D2F" opacity=".85"/><path d="M36 52c0 0 6 24 14 32s14-32 14-32" stroke="#C8A25A" stroke-width="4" fill="none" stroke-linecap="round"/></svg><div class="f-brand">' + D.site.nome + '</div><p class="f-desc">Curadoria de produtos e serviços com respeito e elegância.</p><div class="f-social">' + D.redes.map(r => '<a href="' + r.url + '"><i class="fab ' + r.icone + '"></i></a>').join('') + '</div></div>';
  const cols = [
    { t: 'Produtos', l: [{ t: 'Farmácia', u: '#produtos' }, { t: 'Alimentos', u: '#produtos' }, { t: 'Orgânicos', u: '#produtos' }] },
    { t: 'Serviços', l: [{ t: 'Motorista', u: '#servicos' }, { t: 'Saúde', u: '#servicos' }, { t: 'Concierge', u: '#servicos' }] },
    { t: 'Contato', l: [{ t: D.site.telefone, u: 'tel:' + D.site.telefone }, { t: D.site.email, u: 'mailto:' + D.site.email }] }
  ];
  cols.forEach(c => { fg.innerHTML += '<div><h4>' + c.t + '</h4><ul>' + c.l.map(l => '<li><a href="' + l.u + '">' + l.t + '</a></li>').join('') + '</ul></div>'; });
  document.getElementById('footerBottom').textContent = '© 2026 ' + D.site.nome + ' Marketplace. Todos os direitos reservados.';

  // CARRINHO
  let cart = JSON.parse(localStorage.getItem('ayraCart') || '[]');
  function save() { localStorage.setItem('ayraCart', JSON.stringify(cart)); }
  function upd() {
    save(); const total = cart.reduce((s, i) => s + i.price * i.qty, 0), count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    document.getElementById('cartFooter').style.display = count ? 'block' : 'none';
    const el = document.getElementById('cartItems');
    if (!cart.length) { el.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>'; return; }
    el.innerHTML = cart.map((item, i) => '<div class="cart-item"><img src="' + item.img + '" alt="" class="cart-item-img" onerror="this.style.display=\'none\'"><div class="cart-item-info"><div class="cart-item-name">' + item.name + '</div><div class="cart-item-price">R$ ' + item.price.toFixed(2).replace('.', ',') + '</div><div class="cart-item-qty"><button onclick="window.ayraCart.qty(' + i + ',-1)">−</button><span>' + item.qty + '</span><button onclick="window.ayraCart.qty(' + i + ',1)">+</button></div></div><button class="cart-item-remove" onclick="window.ayraCart.remove(' + i + ')"><i class="fas fa-trash-alt"></i></button></div>').join('');
  }
  window.ayraCart = { add: (id, n, p, img) => { const e = cart.find(i => i.id === id); if (e) e.qty++; else cart.push({ id, name: n, price: p, img, qty: 1 }); upd(); toast('Adicionado ao carrinho!'); }, remove: i => { cart.splice(i, 1); upd(); }, qty: (i, d) => { cart[i].qty += d; if (cart[i].qty <= 0) cart.splice(i, 1); upd(); } };
  document.addEventListener('click', e => { const b = e.target.closest('.add-cart'); if (b) { e.stopPropagation(); const c = b.closest('[data-id]'); if (c) window.ayraCart.add(c.dataset.id, c.dataset.name, parseFloat(c.dataset.price), c.dataset.img || ''); } });
  document.getElementById('cartToggle').addEventListener('click', () => { document.getElementById('cartSidebar').classList.add('open'); document.getElementById('cartOverlay').classList.add('open'); });
  function cc() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('open'); }
  document.getElementById('cartClose').addEventListener('click', cc);
  document.getElementById('cartOverlay').addEventListener('click', cc);
  document.getElementById('cartCheckout').addEventListener('click', () => { if (!cart.length) return; const msg = cart.map(i => i.name + ' x' + i.qty + ' = R$' + (i.price * i.qty).toFixed(2)).join('\n'); const t = cart.reduce((s, i) => s + i.price * i.qty, 0); window.open('https://wa.me/' + D.site.telefone.replace(/[^0-9]/g, '') + '?text=Olá! Quero finalizar meu pedido:%0A' + encodeURIComponent(msg) + '%0A%0ATotal: R$ ' + t.toFixed(2).replace('.', ','), '_blank'); });
  upd();
  function toast(m) { const t = document.createElement('div'); t.className = 'toast show'; t.textContent = m; document.body.appendChild(t); setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2000); }

  // MODAL
  const modal = document.getElementById('modal'), overlay = document.getElementById('modalOverlay'), body = document.getElementById('modalBody');
  function abrir(h) { body.innerHTML = h; modal.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function fechar() { modal.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('modalClose').addEventListener('click', fechar);
  overlay.addEventListener('click', fechar);
  document.querySelectorAll('.card-ct').forEach(el => { el.addEventListener('click', () => { const c = D.conteudos[parseInt(el.dataset.idx)]; if (c) abrir('<span style="font-size:0.65rem;font-weight:600;color:#C8A25A;text-transform:uppercase;letter-spacing:1px">' + c.cat + '</span><h2 style="font-size:1.3rem;color:#1E3D2F;margin:8px 0">' + c.titulo + '</h2><img src="' + c.img + '" style="width:100%;border-radius:8px;margin-bottom:14px" onerror="this.style.display=\'none\'">' + c.html); }); });
  document.querySelectorAll('#produtosGrid .card').forEach(el => { el.addEventListener('click', function() { const p = D.produtos.find(x => x.id === parseInt(this.dataset.id)); if (p) abrir('<img src="' + p.img + '" style="width:100%;border-radius:8px;margin-bottom:14px" onerror="this.style.display=\'none\'"><span style="font-size:0.65rem;font-weight:600;color:#C8A25A;text-transform:uppercase;letter-spacing:1px">' + p.cat + '</span><h2 style="font-size:1.3rem;color:#1E3D2F;margin:8px 0">' + p.nome + '</h2><p style="font-size:0.85rem;line-height:1.7;color:#666;margin-bottom:12px">' + p.desc + '</p><div style="font-size:1.2rem;font-weight:700;color:#C8A25A;margin-bottom:14px">R$ ' + p.preco.toFixed(2).replace('.', ',') + '</div><button class="btn-primary add-cart" data-id="' + p.id + '" data-name="' + p.nome + '" data-price="' + p.preco + '" data-img="' + p.img + '" style="width:100%;justify-content:center">Adicionar ao carrinho</button>'); }); });

  // NEWSLETTER
  document.getElementById('newsForm').addEventListener('submit', e => { e.preventDefault(); toast('Inscrição realizada com sucesso!'); e.target.querySelector('input').value = ''; });
  document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } }); });
})();
