// eslint-disable-next-line import/no-cycle
import autoPlay from './autoplay';

const TABLET_THRESHOLD = 1200;

let slidesPerScreen;
let prev;
let next;
let sliderContent;
let parent;
let slides;
let scrollbar;
let scrollbarFill;
let page;
let pointStartX;
let sliderTranslation;
let horizontalCondition;

let instance;

function findElements() {
  page = document.body;
  parent = document.querySelector('.slider');
  prev = parent.querySelector('.slider__navigation--prev');
  next = parent.querySelector('.slider__navigation--next');
  sliderContent = parent.querySelector('.slider__content');
  slides = [...parent.querySelectorAll('.slide')];
  scrollbar = parent.querySelector('.slider__scrollbar');
  scrollbarFill = scrollbar.querySelector('.slider__scrollbar-fill');
}

function stuckPage() {
  page.classList.add('page-is-stuck');
}

function unStuckPage() {
  page.classList.remove('page-is-stuck');
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

export function isLastSlide() {
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
  autoPlay(instance);
  instance.scroll = scroll + (width / slidesPerScreen + 40 / slidesPerScreen);
  instance.activeIndex = activeIndex - 1;
  translateSlider(instance.scroll);
  next.disabled = false;
  setScrollbarFill();
}

export function onNextClick() {
  const { scroll, width, activeIndex } = instance;
  if (instance.activeIndex === slides.length - (slidesPerScreen + 1)) {
    next.disabled = true;
  }
  autoPlay(instance);
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
  unStuckPage();
}

function onTouchStart(event) {
  stuckPage();
  pointStartX = event ? event.touches[0].pageX : 0;
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);
}

function onMouseMove(event) {
  horizontalCondition = event.pageX - pointStartX;
  sliderTranslation = event.pageX - pointStartX + instance.scroll;
  sliderContent.style = `transform: translateX(${sliderTranslation}px); transition: 0s`;
}

function onMouseUp() {
  if (horizontalCondition < 0 && !isLastSlide()) {
    onNextClick();
  } else if (horizontalCondition > 0 && !isFirstSlide()) {
    onPrevClick();
  } else {
    sliderContent.style = `transform: translateX(${instance.scroll}px);`;
  }
  document.removeEventListener('mouseup', onMouseUp);
  document.removeEventListener('mousemove', onMouseMove);
  unStuckPage();
}

export function setStartSliderCondition() {
  initInstance();
  sliderContent.style = 'transform: translateX(0);';
  scrollbarFill.style = 'width: 0';
  prev.disabled = true;
  next.disabled = false;
  autoPlay(instance);
}

function onMouseDown(event) {
  pointStartX = event ? event.pageX : 0;
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mousemove', onMouseMove);
}

function subscribe() {
  prev.addEventListener('click', onPrevClick);
  next.addEventListener('click', onNextClick);
  if (isMobile()) {
    sliderContent.addEventListener('touchstart', onTouchStart);
  } else {
    sliderContent.addEventListener('mousedown', onMouseDown);
  }
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
  autoPlay(instance);
}
