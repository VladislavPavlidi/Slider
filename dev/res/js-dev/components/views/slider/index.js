const SLIDES_PER_SCREEN = 4;

let prev;
let next;
let sliderContent;
let parent;
let slides;
let scrollbar;
let scrollbarFill;

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

function translateSlider(translation) {
  sliderContent.style = `transform: translateX(${translation}px);`;
}

function isFirstSlide() {
  return instance.activeIndex === 1;
}

function isLastSlide() {
  return instance.activeIndex === slides.length - 5;
}

function setScrollbarFill() {
  scrollbarFill.style = `width: ${
    (instance.activeIndex * 100) / (slides.length - SLIDES_PER_SCREEN)
  }%`;
}

function onPrevClick() {
  const { scroll, width, activeIndex } = instance;
  if (isFirstSlide()) {
    prev.disabled = true;
  }
  instance.scroll =
    scroll + (width / SLIDES_PER_SCREEN + 40 / SLIDES_PER_SCREEN);
  instance.activeIndex = activeIndex - 1;
  translateSlider(instance.scroll);
  next.disabled = false;
  setScrollbarFill();
}

function onNextClick() {
  const { scroll, width, activeIndex } = instance;
  if (isLastSlide()) {
    next.disabled = true;
  }
  instance.scroll =
    scroll - (width / SLIDES_PER_SCREEN + 40 / SLIDES_PER_SCREEN);
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

function subscribe() {
  prev.addEventListener('click', onPrevClick);
  next.addEventListener('click', onNextClick);
}

export default function init() {
  findElements();
  initInstance();
  subscribe();
}
