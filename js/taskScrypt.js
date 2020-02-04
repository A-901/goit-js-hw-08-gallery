'user strict'

import galleryItems from './gallery-items.js';

const refs = {
  jsGallery: document.querySelector('.js-gallery'),
  jsLightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxButton: document.querySelector('.lightbox__button'),  
};

let nextCount = 0;

const addList = galleryItems
.map ((elem, indx) => `<li class = gallery__item> 
<a class = gallery__link href=${elem.original}>
<img class = gallery__image src=${elem.preview} data-source=${elem.original} data-alt=${elem.description} data-pos=${indx} />
 </a>
 </li>`).join(" ");

refs.jsGallery.insertAdjacentHTML ("beforeend", addList);

  const openLightbox =  (event) => {

  const galleryLink = Array.from(document.querySelectorAll('.gallery__link'));
    galleryLink.forEach(item => {
    if (
      event.target.getAttribute('data-source') === item.getAttribute('href')
    ) {
      item.removeAttribute('href');
    }  
     
  });    
  
  refs.jsLightbox.classList.add('is-open');
  refs.lightboxImage.setAttribute('src', event.target.getAttribute('data-source'));
  refs.lightboxImage.setAttribute('alt', event.target.getAttribute('alt'));

};

function closeLightbox(event) {
  refs.jsLightbox.classList.remove('is-open');
  refs.lightboxImage.setAttribute('src','');
  refs.lightboxImage.setAttribute('alt', '');
};

function closeEsc(event) {
  if (event.keyCode === 27) closeLightbox();
};

function closeOverlay(event) {
  if (event.target === refs.lightboxContent) closeLightbox(event);
};


const handleClickBtn = evt => {
  
  if (evt.target.className === "next") {
    nextCount++;
    console.log("click next");
    console.log(nextCount);
    if (nextCount <= galleryItems.length ) {
      // refs.lightboxImage.insertAdjacentHTML = `<img src='${galleryItems[nextCount].original}'/>`;
      refs.lightboxImage.setAttribute('src' , `${galleryItems[nextCount].original}`)
    } 
    else { 
      nextCount = 0;
    }
  } else if (evt.target.className === "prev") {
    nextCount--;
    console.log("click prev");
    console.log(nextCount);
    // if (nextCount < 0)
    // refs.lightboxImage.insertAdjacentHTML = `<img src='${galleryItems[nextCount].original}'/>`;
    refs.lightboxImage.setAttribute('src' , `${galleryItems[nextCount].original}`);
  }
};

refs.jsGallery.addEventListener('click', openLightbox);
refs.lightboxButton.addEventListener('click', closeLightbox);
window.addEventListener('keydown', closeEsc);
refs.lightboxContent.addEventListener('click', closeOverlay);
refs.lightboxButton.addEventListener('click', handleClickBtn);

