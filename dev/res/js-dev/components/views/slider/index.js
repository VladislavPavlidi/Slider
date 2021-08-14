let prev;
let next;
let sliderContent;
let parent;
let slides;

let instance;

function findElements() {
  parent = document.querySelector('.slider');
  prev = parent.querySelector('.slider__navigation--prev');
  next = parent.querySelector('.slider__navigation--next');
  sliderContent = parent.querySelector('.slider__content');
  slides = [...parent.querySelectorAll('.slide')];
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

function onPrevClick() {
  const { scroll, width, activeIndex } = instance;
  if (isFirstSlide()) {
    prev.disabled = true;
  }
  instance.scroll = scroll + (width / 4 + 40 / 4);
  instance.activeIndex = activeIndex - 1;
  translateSlider(instance.scroll);
  next.disabled = false;
}

function onNextClick() {
  const { scroll, width, activeIndex } = instance;
  if (isLastSlide()) {
    next.disabled = true;
  }
  instance.scroll = scroll - (width / 4 + 40 / 4);
  instance.activeIndex = activeIndex + 1;
  translateSlider(instance.scroll);
  prev.disabled = false;
}

function initInstance() {
  instance = {
    node: sliderContent,
    scroll: 0,
    activeIndex: 0,
    width: sliderContent.offsetWidth,
    slidesCount: slides.length - 1,
  };
}

function subscribe(object) {
  prev.addEventListener('click', () => onPrevClick(object));
  next.addEventListener('click', () => onNextClick(object));
}

export default function init() {
  findElements();
  initInstance();
  subscribe();
}
