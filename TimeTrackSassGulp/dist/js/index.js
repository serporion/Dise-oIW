document.addEventListener("DOMContentLoaded", function () {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  });

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  const appendAlert = (message, type) => {

    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
  };

  const understoodBtn = document.getElementById('understoodBtn');

  if (understoodBtn) {
    understoodBtn.addEventListener('click', () => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('whyModal'));
      modal.hide();
      appendAlert('Se ha registrado la lectura.', 'success');
    });
  }


// Funcion para ocultar el header y que el main lo acompañe cuando aparece.
let lastScrollTop = 0;
const header = document.getElementById('cabecera');
const headerHeight = header.offsetHeight;
const body = document.body;

window.addEventListener('scroll', function() {
  let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
    // Scrolling down - ocultar header
    header.style.top = `-${headerHeight}px`;
    body.style.paddingTop = '0'; // Eliminar el padding
    body.style.marginTop = '0';
  } else {
    // Scrolling up - mostrar header
    header.style.top = '0';
    body.style.paddingTop = `${headerHeight}px`; // Restaurar el padding
  }
  
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, false);


// Añadir efecto de animación a las tarjetas
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.caracteristicas .card');
  
  // Añadir clase para animación de entrada
  setTimeout(() => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animated');
      }, 100 * index);
    });
  }, 300);
  
  // Efecto de hover 3D suave
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const dx = x - xc;
      const dy = y - yc;
      
      this.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
});
