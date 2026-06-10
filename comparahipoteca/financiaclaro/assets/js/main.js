/* ============================================
   FinanciaClaro — JS Global
   ============================================ */

// ── Menú mobile ──────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ── Cookie banner ────────────────────────────
const cookieOverlay = document.getElementById('cookie-overlay');
const cookieAccept  = document.getElementById('cookie-accept');
const cookieReject  = document.getElementById('cookie-reject');

function closeCookie() {
  if (cookieOverlay) cookieOverlay.classList.remove('show');
}
if (cookieOverlay) {
  if (!localStorage.getItem('fc_cookie')) {
    cookieOverlay.classList.add('show');
  }
  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('fc_cookie', 'accepted');
      closeCookie();
    });
  }
  if (cookieReject) {
    cookieReject.addEventListener('click', () => {
      localStorage.setItem('fc_cookie', 'rejected');
      closeCookie();
    });
  }
}

// ── Calculadora hipoteca (función global) ────
function calcHipoteca({ importe, plazo, tin, ids }) {
  const r = (tin / 100) / 12;
  const n = plazo * 12;
  const cuota = r === 0 ? importe / n
    : importe * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total     = cuota * n;
  const intereses = total - importe;
  const tae       = (Math.pow(1 + r, 12) - 1) * 100;

  if (ids.cuota)     document.getElementById(ids.cuota).textContent     = Math.round(cuota).toLocaleString('es-ES');
  if (ids.total)     document.getElementById(ids.total).textContent     = Math.round(total).toLocaleString('es-ES') + ' €';
  if (ids.intereses) document.getElementById(ids.intereses).textContent = Math.round(intereses).toLocaleString('es-ES') + ' €';
  if (ids.tae)       document.getElementById(ids.tae).textContent       = tae.toFixed(2) + '%';
  if (ids.cuotas)    document.getElementById(ids.cuotas).textContent    = n;
}

// ── TOC activo (artículos) ───────────────────
function initTOC() {
  const links   = document.querySelectorAll('.sidebar-toc a');
  const targets = Array.from(links).map(a => document.querySelector(a.getAttribute('href')));
  if (!links.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const idx = targets.indexOf(entry.target);
        if (idx > -1) links[idx].classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });
  targets.forEach(t => t && obs.observe(t));
}
document.addEventListener('DOMContentLoaded', initTOC);

// ── Tabs panel hero ──────────────────────────
function setActiveTab(id, groupClass) {
  document.querySelectorAll('.' + groupClass).forEach(btn => {
    btn.classList.remove('active');
  });
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ── Formatear número español ─────────────────
function fmtEUR(n) {
  return Math.round(n).toLocaleString('es-ES') + ' €';
}
function fmtPct(n, dec = 2) {
  return n.toFixed(dec) + '%';
}
