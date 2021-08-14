const TABLET_THRESHOLD = 1200;

let slidesPerScreen;
let prev;
let next;
let sliderContent;
let parent;
let slides;
let scrollbar;
let scrollbarFill;
let pointStartX;
let sliderTranslation;
let horizontalCondition;

let instance;

function findElements() {
  parent = document.querySelector('.slider');
  prev = parent.querySelector('.slider__navigation--prev');
  next = parent.querySelector('.slider__navigation--next');
  sliderContent = parent.querySelector('.slider__content');
  slides = [...parent.querySelectorAll('.slide')];
  scrollbar = parent.querySelector('.slider__scrollbar');
  scrollbarFill = scrollbar.querySelector('.slider__scrollbar-fill');
}

function isMobile() {
  const { innerWidth } = window;
  return innerWidth < TABLET_THRESHOLD;
}

function translateSlider(translation) {
  sliderContent.style = `transform: translateX(${translation}px);`;
}

function isFirstSlide() {
  return instance.activeIndex === 0;
}

function isLastSlide() {
  return instance.activeIndex === slides.length - slidesPerScreen;
}

function setScrollbarFill() {
  scrollbarFill.style = `width: ${Math.round(
    (instance.activeIndex * 100) / (slides.length - slidesPerScreen)
  )}%`;
}

function onPrevClick() {
  const { scroll, width, activeIndex } = instance;
  if (instance.activeIndex === 1) {
    prev.disabled = true;
  }
  instance.scroll = scroll + (width / slidesPerScreen + 40 / slidesPerScreen);
  instance.activeIndex = activeIndex - 1;
  translateSlider(instance.scroll);
  next.disabled = false;
  setScrollbarFill();
}

function onNextClick() {
  const { scroll, width, activeIndex } = instance;
  if (instance.activeIndex === slides.length - (slidesPerScreen + 1)) {
    next.disabled = true;
  }
  instance.scroll = scroll - (width / slidesPerScreen + 40 / slidesPerScreen);
  instance.activeIndex = activeIndex + 1;
  translateSlider(instance.scroll);
  prev.disabled = false;
  setScrollbarFill();
}

function initInstance() {
  instance = {
    node: sliderContent,
    scroll: 0,
    activeIndex: 0,
    width: sliderContent.offsetWidth,
    slidesCount: slides.length - 1,
    scrollbarWidth: 0,
  };
}

function onTouchMove(event) {
  horizontalCondition = event.touches[0].pageX - pointStartX;
  sliderTranslation = event.touches[0].pageX - pointStartX + instance.scroll;
  sliderContent.style = `transform: translateX(${sliderTranslation}px); transition: 0s`;
}

function onTouchEnd() {
  if (horizontalCondition < 0 && !isLastSlide()) {
    onNextClick();
  } else if (horizontalCondition > 0 && !isFirstSlide()) {
    onPrevClick();
  } else {
    sliderContent.style = `transform: translateX(${instance.scroll}px);`;
  }
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
}

function onTouchStart(event) {
  pointStartX = event ? event.touches[0].pageX : 0;
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);
}

function subscribe() {
  prev.addEventListener('click', onPrevClick);
  next.addEventListener('click', onNextClick);
  sliderContent.addEventListener('touchstart', onTouchStart);
}

export default function init() {
  findElements();
  if (isMobile()) {
    slidesPerScreen = 1;
  } else {
    slidesPerScreen = 4;
  }
  initInstance();
  subscribe();
}
