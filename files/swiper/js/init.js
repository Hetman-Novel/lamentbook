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

const bookSlider = document.querySelector('.book-slider');
if (bookSlider) {
   var swiper = new Swiper(bookSlider, {
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      hashNavigation: {
         watchState: true,
      },
      watchOverflow: true,
      spaceBetween: 40,
      loop: false,
      speed: 800,
      effect: 'fade',
      slidesPerView: 1,
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrevNext: true,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      simulateTouch: false,
      allowTouchMove: false,
      on: {
         slideChangeTransitionEnd: function () {
            // Удаляем класс zoomed со всех слайдов

            if (swiper) {
               swiper.slides.forEach(slide => {
                  if (slide) {
                     slide.classList.remove('zoomed');
                  }
               })
            }

            var activeSlide = this.slides[this.activeIndex];
            var imageElement = activeSlide.querySelector('img[loading="lazy"]');

            if (wzoom) {
               wzoom.destroy(); // Уничтожаем предыдущий экземпляр WZoom
            }

            if (imageElement && imageElement.complete) {
               init(imageElement);
            } else if (imageElement) {
               imageElement.onload = function () {
                  init(imageElement);
               };
            }
         }
      }
   });

   var wzoom = null; // Переменная для хранения экземпляра WZoom

   function init(imageElement) {
      var rangeElement = document.querySelector('[data-zoom-range]');

      if (!rangeElement) {
         console.error('Range element not found');
         return;
      }

      wzoom = WZoom.create(imageElement, {
         type: 'html',
         width: imageElement.naturalWidth,
         height: imageElement.naturalHeight,
         maxScale: 3,
         minScale: 1,
         dragScrollable: true, // Включаем перетаскивание
         onGrab: function () {
            var activeSlide = swiper.slides[swiper.activeIndex];
            if (activeSlide.classList.contains('zoomed')) {
               activeSlide.style.cursor = 'grabbing';
            }
         },
         onDrop: function () {
            var activeSlide = swiper.slides[swiper.activeIndex];
            if (activeSlide.classList.contains('zoomed')) {
               activeSlide.style.cursor = 'grab';
            }
         },
         prepare: function (instance) {
            rangeElement.defaultValue = 0;
            rangeElement.max = Math.round(Math.log(instance.content.maxScale / instance.content.minScale) / Math.log(instance.options.speed));
         },
         rescale: function (instance) {
            rangeElement.value = Math.round(Math.log(instance.content.currentScale / instance.content.minScale) / Math.log(instance.options.speed));
         }
      });

      document.querySelector('[data-zoom-up]').addEventListener('click', function () {
         if (wzoom) {
            wzoom.zoomUp();
            var activeSlide = swiper.slides[swiper.activeIndex];
            activeSlide.classList.add('zoomed'); // Добавляем класс zoomed
         }
      });

      document.querySelector('[data-zoom-down]').addEventListener('click', function () {
         if (wzoom) {
            wzoom.zoomDown();
            var activeSlide = swiper.slides[swiper.activeIndex];
            if (wzoom.content.currentScale <= wzoom.options.minScale) {
               activeSlide.classList.remove('zoomed'); // Удаляем класс zoomed
            }
         }
      });

      window.addEventListener('resize', function () {
         if (wzoom) {
            wzoom.prepare();
         }
      });

      rangeElement.addEventListener('input', function () {
         var newZoom = Number(rangeElement.value);

         if (newZoom === 0) {
            wzoom.maxZoomDown();
         } else if (newZoom === rangeElement.max) {
            wzoom.maxZoomUp();
         } else {
            var oldZoom = Math.round(Math.log(wzoom.content.currentScale / wzoom.content.minScale) / Math.log(wzoom.options.speed));

            if (newZoom > oldZoom) {
               wzoom.zoomUp();
            } else {
               wzoom.zoomDown();
            }
         }
      });
   }

   // Инициализируем WZoom для первого слайда при загрузке страницы
   document.addEventListener('DOMContentLoaded', function () {
      var firstSlide = swiper.slides[swiper.activeIndex];
      var imageElement = firstSlide.querySelector('img[loading="lazy"]');
      if (imageElement) {
         init(imageElement);
      }
   });
}
document.addEventListener("DOMContentLoaded", function() {
   // Добавление класса video-uploaded при загрузке видео
   const videos = document.querySelectorAll("video");
   videos.forEach(video => {
       video.addEventListener('loadeddata', function() {
           video.parentElement.classList.add('video-uploaded');
       });
   });

   // Удаление класса video-uploaded при клике на next/prev кнопки
   /*
   const swiperButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
   swiperButtons.forEach(button => {
       button.addEventListener('click', function() {
           const slides = document.querySelectorAll('.swiper-slide');
           slides.forEach(slide => {
               slide.classList.remove('video-uploaded');
           });

           // Восстановление класса video-uploaded для активного слайдера, если в нем загружено видео
           const activeSlide = document.querySelector('.swiper-slide-active');
           const videoInActiveSlide = activeSlide.querySelector('video');
           if (videoInActiveSlide && videoInActiveSlide.readyState >= 3) { // Проверка, загружено ли видео
               activeSlide.classList.add('video-uploaded');
           }
       });
   });
   */
});

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
