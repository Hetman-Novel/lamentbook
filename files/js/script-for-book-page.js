document.querySelectorAll('.remove-bookmark').forEach((bookmarkButton) => {
   bookmarkButton.addEventListener('click', () => {
      document.querySelector('.swiper-slide-active .wrap-bookmark').remove()
   })
})

// для текста
const btnShowText = document.querySelector('.btn-show-text')
if (btnShowText) {
   document.querySelectorAll('.btn-show-text').forEach((btnsShowText) => {
      btnsShowText.addEventListener('click', () => {
         document.querySelector('.swiper-slide-active .book-page__book-text').classList.toggle('show')
      })
   })
   function checkActiveSlideContent(removeShowClass = false) {
      const activeSlide = document.querySelector('.swiper-slide-active');
      const textElement = activeSlide ? activeSlide.querySelector('.book-page__book-text') : null;
      const btnShowText = document.querySelector('.btn-show-text');
      if (removeShowClass && textElement && textElement.classList.contains('show')) {
         textElement.classList.remove('show');
      }
      if (!textElement && btnShowText) {
         btnShowText.classList.add('hidden');
      } else if (textElement && btnShowText) {
         btnShowText.classList.remove('hidden');
      }
   }
   function addEventListeners() {
      document.querySelectorAll('.swiper-button-prev, .swiper-button-next, .authors-page__link-to-page').forEach(button => {
         button.addEventListener('click', () => {
            setTimeout(() => checkActiveSlideContent(true), 100);
         });
      });
   }
   document.addEventListener('DOMContentLoaded', () => {
      checkActiveSlideContent();
      addEventListeners();
   });
}


// для видео
/*
document.addEventListener('DOMContentLoaded', () => {
   const btnPlayVideo = document.querySelector('.btn-play-video');

   // Функция для проверки наличия видео в активном слайде
   function checkActiveSlideVideo() {
      const activeSlide = document.querySelector('.swiper-slide-active');
      const videoElement = activeSlide ? activeSlide.querySelector('video') : null;

      // Если в активном слайде есть видео, показать кнопку; если нет - скрыть кнопку
      if (videoElement && btnPlayVideo) {
         btnPlayVideo.classList.remove('hidden');
      } else if (btnPlayVideo) {
         btnPlayVideo.classList.add('hidden');
      }

      // Останавливаем все неактивные видео
      stopInactiveVideos();
   }

   // Функция для остановки всех неактивных видео
   function stopInactiveVideos() {
      document.querySelectorAll('.swiper-slide video').forEach(video => {
         const slide = video.closest('.swiper-slide');
         if (!slide.classList.contains('swiper-slide-active')) {
            video.pause();           // Останавливаем видео
            video.currentTime = 0;   // Возвращаем на начало
         }
      });
   }

   // Функция для запуска загрузки и воспроизведения видео в активном слайде
   function playActiveSlideVideo() {
      const activeSlide = document.querySelector('.swiper-slide-active');
      const videoElement = activeSlide ? activeSlide.querySelector('video') : null;

      if (videoElement) {
         // Добавляем класс для состояния загрузки
         activeSlide.classList.add('loading');

         // Добавляем событие loadeddata для удаления класса загрузки и запуска воспроизведения
         videoElement.addEventListener('loadeddata', () => {
            activeSlide.classList.remove('loading');
            activeSlide.classList.add('video-uploaded'); // Добавляем класс после загрузки
            videoElement.play();   // Запускаем видео после загрузки
         }, { once: true }); // Обработчик срабатывает один раз

         // Начинаем загрузку видео
         videoElement.load();
      }
   }

   // Добавляем обработчик события на кнопку воспроизведения
   if (btnPlayVideo) {
      btnPlayVideo.addEventListener('click', playActiveSlideVideo);
   }

   // Проверка наличия видео в активном слайде при каждом клике на переключение
   document.querySelectorAll('.swiper-button-prev, .swiper-button-next, .authors-page__link-to-page').forEach(button => {
      button.addEventListener('click', () => {
         setTimeout(checkActiveSlideVideo, 100); // Небольшая задержка для обновления активного слайда
      });
   });

   // Проверка активного слайда при загрузке страницы
   checkActiveSlideVideo();
});
*/

document.addEventListener('DOMContentLoaded', () => {
   const btnPlayVideo = document.querySelector('.btn-play-video');

   // Функция для проверки наличия видео в активном слайде
   function checkActiveSlideVideo() {
      const activeSlide = document.querySelector('.swiper-slide-active');
      const videoElement = activeSlide ? activeSlide.querySelector('video') : null;

      // Если в активном слайде есть видео, показать кнопку; если нет - скрыть кнопку
      if (videoElement && btnPlayVideo) {
         btnPlayVideo.classList.remove('hidden');
      } else if (btnPlayVideo) {
         btnPlayVideo.classList.add('hidden');
      }

      // Останавливаем все неактивные видео и удаляем класс video-uploaded
      stopInactiveVideos();
   }

   // Функция для остановки всех неактивных видео и удаления класса video-uploaded
   function stopInactiveVideos() {
      document.querySelectorAll('.swiper-slide').forEach(slide => {
         const video = slide.querySelector('video');
         if (!slide.classList.contains('swiper-slide-active')) {
            if (video) {
               video.pause();           // Останавливаем видео
               video.currentTime = 0;   // Возвращаем на начало
            }
            slide.classList.remove('video-uploaded'); // Удаляем класс video-uploaded
         }
      });
   }

   // Функция для запуска загрузки и воспроизведения видео в активном слайде
   function playActiveSlideVideo() {
      const activeSlide = document.querySelector('.swiper-slide-active');
      const videoElement = activeSlide ? activeSlide.querySelector('video') : null;

      if (videoElement) {
         // Добавляем класс для состояния загрузки
         activeSlide.parentNode.parentNode.parentNode.classList.add('loading');

         // Добавляем событие loadeddata для удаления класса загрузки и добавления video-uploaded
         videoElement.addEventListener('loadeddata', () => {
            activeSlide.parentNode.parentNode.parentNode.classList.remove('loading');
            activeSlide.classList.add('video-uploaded'); // Добавляем класс после загрузки
            videoElement.play();   // Запускаем видео после загрузки
         }, { once: true }); // Обработчик срабатывает один раз

         // Начинаем загрузку видео
         videoElement.load();
      }
   }

   // Добавляем обработчик события на кнопку воспроизведения
   if (btnPlayVideo) {
      btnPlayVideo.addEventListener('click', playActiveSlideVideo);
   }

   // Проверка наличия видео в активном слайде при каждом клике на переключение
   document.querySelectorAll('.swiper-button-prev, .swiper-button-next, .authors-page__link-to-page').forEach(button => {
      button.addEventListener('click', () => {
         setTimeout(checkActiveSlideVideo, 100); // Небольшая задержка для обновления активного слайда
      });
   });

   // Проверка активного слайда при загрузке страницы
   checkActiveSlideVideo();
});