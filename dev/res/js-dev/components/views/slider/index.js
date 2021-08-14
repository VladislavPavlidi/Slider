const TABLET_THRESHOLD = 1200;

let slidesPerScreen;
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

function isMobile() {
  const { innerWidth } = window;
  return innerWidth < TABLET_THRESHOLD;
}

function translateSlider(translation) {
  sliderContent.style = `transform: translateX(${translation}px);`;
}

function isFirstSlide() {
  return instance.activeIndex === 1;
}

function isLastSlide() {
  return instance.activeIndex === slides.length - (slidesPerScreen + 1);
}

function setScrollbarFill() {
  scrollbarFill.style = `width: ${Math.round(
    (instance.activeIndex * 100) / (slides.length - slidesPerScreen)
  )}%`;
}

function onPrevClick() {
  const { scroll, width, activeIndex } = instance;
  if (isFirstSlide()) {
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
  if (isLastSlide()) {
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

function subscribe() {
  prev.addEventListener('click', onPrevClick);
  next.addEventListener('click', onNextClick);
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
