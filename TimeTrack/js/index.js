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

  
  /*
  document.addEventListener('DOMContentLoaded', function () {
    const myCarouselElement = document.querySelector('#myCarousel');

    const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval: 2000, // Auto avance cada 2 segundos
      touch: false     // Deshabilitar el deslizamiento táctil
    });
  });
  */



  let lastScrollTop = 0;

const header = document.getElementById('cabecera');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', function() {
  let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
    // Scrolling down
    header.style.top = `-${headerHeight}px`;
  } else {
    // Scrolling up
    header.style.top = '0';
  }
  
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, false);