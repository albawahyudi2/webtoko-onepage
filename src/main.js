// ===== PRODUCT DATA =====
const products = [
  {
    id: 'feronix',
    name: 'Special Gel Feronix',
    desc: 'Gel herbal premium untuk performa maksimal pria. Formula khusus 10x lebih ampuh dengan bahan alami berkualitas tinggi.',
    image: '/images/feronix.jpeg',
    priceOld: 350000,
    priceNew: 139000,
    rating: 4.9,
    reviews: 8901,
    sold: '10rb+',
    badge: 'BEST SELLER',
    bpom: 'NA1824117253',
  },
  {
    id: 'theravol',
    name: 'Theravol Natural Liquid',
    desc: 'Liquid herbal alami untuk stamina dan vitalitas pria. Formulasi natural dengan khasiat terbukti.',
    image: '/images/theravol.jpeg',
    priceOld: 299000,
    priceNew: 129000,
    rating: 4.8,
    reviews: 5420,
    sold: '7rb+',
    bpom: 'NA18240117248',
  },
  {
    id: 'primaron',
    name: 'Primaron Special Liquid',
    desc: 'Liquid spesial premium untuk meningkatkan performa dan kepercayaan diri pria secara alami.',
    image: '/images/primaron.jpeg',
    priceOld: 299000,
    priceNew: 129000,
    rating: 4.8,
    reviews: 4830,
    sold: '6rb+',
    bpom: 'NA18240117249',
  },
  {
    id: 'tigajari',
    name: 'Tiga Jari Oil',
    desc: 'Minyak oles herbal khusus pria. Formula tradisional dengan bahan alami pilihan untuk hasil optimal.',
    image: '/images/tiga-jari.jpeg',
    priceOld: 320000,
    priceNew: 135000,
    rating: 4.7,
    reviews: 3950,
    sold: '5rb+',
    bpom: 'NA18230110534',
  },
];

const WA_NUMBER = '6285800927580';
const SHOPEE_LINK = 'https://shopee.co.id/reenii_2?categoryId=100001&entryPoint=ShopByPDP&itemId=24276308225';

// ===== HELPERS =====
function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

function discountPercent(old, now) {
  return Math.round(((old - now) / old) * 100);
}

function generateStars(rating) {
  const full = Math.floor(rating);
  return '⭐'.repeat(full);
}

// ===== RENDER PRODUCT CARDS =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map((p, i) => `
    <div class="product-card reveal reveal-d${i + 1}" data-id="${p.id}">
      <span class="badge">🔥 ${p.badge}</span>
      <div class="img-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
      <div class="info">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price-row">
          <span class="price-old">${formatRupiah(p.priceOld)}</span>
          <span class="price-new">${formatRupiah(p.priceNew)}</span>
        </div>
        <div class="rating">${generateStars(p.rating)} ${p.rating} (${p.reviews.toLocaleString('id-ID')} ulasan) · Terjual ${p.sold}</div>
        <a href="#pesan" class="card-cta" data-select="${p.id}">Pesan Sekarang →</a>
      </div>
    </div>
  `).join('');
}

// ===== RENDER ORDER PRODUCT SELECTOR =====
function renderOrderProducts() {
  const container = document.getElementById('orderProducts');
  container.innerHTML = products.map((p, i) => `
    <div class="order-product ${i === 0 ? 'selected' : ''}" data-id="${p.id}">
      <img src="${p.image}" alt="${p.name}" />
      <div class="op-info">
        <h4>${p.name}</h4>
        <span class="op-price">${formatRupiah(p.priceNew)} <small style="color:var(--text3);text-decoration:line-through;font-weight:400">${formatRupiah(p.priceOld)}</small></span>
      </div>
    </div>
  `).join('');
}

// ===== ORDER STATE =====
let selectedProduct = products[0];
let qty = 1;

function updateSummary() {
  document.getElementById('sumProduct').textContent = selectedProduct.name;
  document.getElementById('sumPrice').textContent = formatRupiah(selectedProduct.priceNew);
  document.getElementById('qtyVal').value = qty;
  document.getElementById('sumTotal').textContent = formatRupiah(selectedProduct.priceNew * qty);
  updateWaLinks();
}

function generateWaText() {
  return `FORMAT PEMESANAN

Nama Lengkap: 
No. HP: 
Alamat Lengkap: (Sertakan Jalan, No. Rumah, RT/RW, Kec, Kota, & Kode Pos)
Pesanan: ${selectedProduct.name} - ${qty} pcs
Ekspedisi: (JNE / J&T / Sicepat / Gojek)
Metode Bayar: (Transfer Bank / COD)`;
}

function getWaLink() {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(generateWaText())}`;
}

function updateWaLinks() {
  const link = getWaLink();
  document.getElementById('btnWa').href = link;
  document.getElementById('mobileWa').href = link;
  document.getElementById('floatingWa').href = link;
}

// ===== EVENT HANDLERS =====
function initOrderEvents() {
  // Product selector click
  document.getElementById('orderProducts').addEventListener('click', (e) => {
    const card = e.target.closest('.order-product');
    if (!card) return;
    document.querySelectorAll('.order-product').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedProduct = products.find(p => p.id === card.dataset.id);
    updateSummary();
  });

  // Product card "Pesan Sekarang" click
  document.getElementById('productsGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-select]');
    if (!btn) return;
    const id = btn.dataset.select;
    selectedProduct = products.find(p => p.id === id);
    document.querySelectorAll('.order-product').forEach(c => {
      c.classList.toggle('selected', c.dataset.id === id);
    });
    qty = 1;
    updateSummary();
  });

  // Qty buttons
  document.getElementById('qtyPlus').addEventListener('click', () => {
    if (qty < 10) { qty++; updateSummary(); }
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; updateSummary(); }
  });
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  burger.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== FLOATING WA VISIBILITY =====
function initFloatingWa() {
  const btn = document.getElementById('floatingWa');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });
}

// ===== TESTIMONIAL AUTO SCROLL =====
function initTestiScroll() {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  let direction = 1;
  setInterval(() => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 2) direction = -1;
    if (track.scrollLeft <= 2) direction = 1;
    track.scrollBy({ left: direction * 310, behavior: 'smooth' });
  }, 4000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderOrderProducts();
  updateSummary();
  initOrderEvents();
  initNavbar();
  initFloatingWa();
  initTestiScroll();
  // Delay reveal init so dynamically rendered elements are in DOM
  requestAnimationFrame(() => initReveal());
});
