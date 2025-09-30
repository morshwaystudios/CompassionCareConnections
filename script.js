/* =============================
   Compassionate Care Connections
   Funnel Interactions
   ============================= */

// Helper: Smooth scroll to targets
const scrollToTarget = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Promo bar close & deep link
(() => {
  const bar = document.getElementById('promoBar');
  const closeBtn = bar?.querySelector('.bar__close');
  const linkBtn = bar?.querySelector('.bar__link');
  closeBtn?.addEventListener('click', () => bar.remove());
  linkBtn?.addEventListener('click', () => scrollToTarget(linkBtn.dataset.scrollTo));
})();

// Mobile nav toggle
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navMenu');
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu on link click
  menu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
})();

// Intersection-based reveal animations
(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// Carousel (CSS-friendly, lightweight autoplay)
(() => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    if (!track) return;
    const interval = Number(carousel.dataset.interval || 5000);
    let idx = 0; const items = [...track.children];
    function advance(){
      idx = (idx + 1) % items.length;
      const x = items.slice(0, idx).reduce((acc, el) => acc + el.getBoundingClientRect().width + 16, 0);
      track.style.transform = `translateX(${-x}px)`;
      track.style.transition = 'transform 600ms ease';
    }
    if (carousel.dataset.autoplay === 'true' && items.length > 1){
      setInterval(advance, interval);
    }
  });
})();

// Lead form validation + event stub
(() => {
  const form = document.getElementById('leadForm');
  const phoneRe = /^(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    // Basic validate
    const errors = [];
    if (!data.name || data.name.trim().length < 2) errors.push('Please enter your name.');
    if (!data.phone || !phoneRe.test(data.phone)) errors.push('Please enter a valid phone number.');
    if (!data.service) errors.push('Please select a service.');

    // Clear any prior errors
    form.querySelectorAll('.error').forEach(el => el.remove());

    if (errors.length){
      const p = document.createElement('p');
      p.className = 'error';
      p.textContent = errors[0];
      form.querySelector('.form__actions').appendChild(p);
      return;
    }

    // Analytics stub (swap with GA/Meta/Pixel)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_submit',
      lead: { name: data.name, phone: data.phone, email: data.email || '', service: data.service }
    });

    // UX feedback
    form.reset();
    alert('Thanks! We received your request and will reach out shortly.');
  });
})();

// Exit intent modal
(() => {
  const modal = document.getElementById('exitModal');
  const close = modal?.querySelector('.modal__close');
  let shown = false;
  function open(){ if (!shown){ modal.style.display = 'flex'; modal.setAttribute('aria-hidden', 'false'); shown = true; } }
  function hide(){ modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); }
  close?.addEventListener('click', hide);
  modal?.addEventListener('click', (e) => { if (e.target === modal) hide(); });
  document.addEventListener('mouseleave', (e) => { if (e.clientY <= 0) open(); });
})();

// Footer year
(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Smooth scroll for internal links
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (hash && hash.length > 1){
        const el = document.querySelector(hash);
        if (el){ e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
})();
