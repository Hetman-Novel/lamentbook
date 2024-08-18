document.querySelectorAll('.remove-bookmark').forEach((bookmarkButton) => {
   bookmarkButton.addEventListener('click', () => {
      document.querySelector('.swiper-slide-active .wrap-bookmark').remove()
   })
})

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