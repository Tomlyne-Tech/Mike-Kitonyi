// ===== MOBILE NAVIGATION TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change icon between bars / xmark
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Auto close when link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });
}



// Polished interactivity: year, contact form -> mailto, project modal + keyboard accessibility
document.addEventListener('DOMContentLoaded', function(){
  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form: build mailto fallback
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const form = new FormData(contactForm);
      const name = form.get('name')?.trim() || 'Anonymous';
      const email = form.get('email')?.trim() || '';
      const msg = form.get('message')?.trim() || '';
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      // open user's email client with the message
      window.location.href = `mailto:kikatamichael69@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Project modal logic
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = document.querySelector('.modal-close');

  function openModal(title, desc, src){
    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden','false');
    // focus management
    closeBtn?.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  document.querySelectorAll('.project-thumb').forEach(btn=>{
    btn.addEventListener('click', function(){
      const img = btn.dataset.img || '';
      const title = btn.dataset.title || '';
      const desc = btn.dataset.desc || '';
      openModal(title, desc, img);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (ev)=>{
    if(ev.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeModal();
  });

  // Simple reduced motion check
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    document.documentElement.style.setProperty('--trans', 'none');
  }
});
