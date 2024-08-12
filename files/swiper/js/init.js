const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Получаем все изображения с атрибутом loading="lazy"
function addLoadedClass(image) { // Функция для добавления класса к родителю изображения после его загрузки
   const parentElement = image.parentElement;
   if (image.complete) { // Проверяем, загружено ли изображение
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Добавляем событие load, чтобы добавить класс после загрузки изображения
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Перебираем все изображения и вызываем функцию addLoadedClass для каждого

/* === */
/*
document.addEventListener('DOMContentLoaded', () => {
   // Function to redirect to the correct URL if needed
   function handleRedirect() {
      const currentPath = window.location.pathname;
      const isBookPage = currentPath.startsWith('/book/page/');

      if (isBookPage) {
         // Do nothing as the URL is already correct
         return;
      }

      // Example: If the path is `/book` but there's no `page/` in it, default to page 1
      if (currentPath === '/book') {
         window.location.replace('/book/page/1');
      }
   }

   // Listen to the popstate event to handle back/forward navigation
   window.addEventListener('popstate', handleRedirect);

   // Call the function on initial load
   handleRedirect();
});*/

const bookSlider = document.querySelector('.book-slider')
if (bookSlider) {
   new Swiper(bookSlider, {
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      /*
      on: {
         slideChange: function () {
            // Get the active slide index
            const activeIndex = this.activeIndex + 1; // +1 to make it a 1-based index
            
            // Update the URL with the new slide index
            const newUrl = `/book/page/${activeIndex}`;
            history.pushState(null, null, newUrl);
         }
      },
      */
      watchOverflow: true,
      spaceBetween: 40,
      loop: false,
      speed: 800,
      effect: 'fade',
      slidesPerView: 1,
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
   });
}

const aboutProjectSlider = document.querySelector('.about-project-slider')
if (aboutProjectSlider) {
   new Swiper(aboutProjectSlider, {
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },
      watchOverflow: true,
      spaceBetween: 40,
      loop: true,
      speed: 800,
      effect: 'fade',
      slidesPerView: 1,
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      autoplay: {
         delay: 8000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },
      breakpoints: {
         0: {
            autoHeight: true
         },
         801: {
            autoHeight: false
         }
      },
   });
}

const galleryPhoto = document.querySelector('.gallery-photo')
if (galleryPhoto) {
   var swiper = new Swiper(".gallery-photos", {
      spaceBetween: 18,
      slidesPerView: 9,
      speed: 800,
      loop: true,
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      breakpoints: {
         0: {
            slidesPerView: 4,
            spaceBetween: 10,
         },
         373: {
            slidesPerView: 5,
            spaceBetween: 10,
         },
         481: {
            slidesPerView: 6,
            spaceBetween: 10,
         },
         641: {
            slidesPerView: 8,
            spaceBetween: 18,
         },
         801: {
            slidesPerView: 9,
            spaceBetween: 18,
         }
      },
   });
   var swiper2 = new Swiper(galleryPhoto, {
      navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 40,
      effect: 'fade',
      fadeEffect: {
         crossFade: true
      },
      loop: true,
      thumbs: {
         swiper: swiper,
      },
   });
}
