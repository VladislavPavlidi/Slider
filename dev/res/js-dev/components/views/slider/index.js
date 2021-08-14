let prev;
let next;
let sliderContent;
let parent;

let instance;

function findElements() {
  parent = document.querySelector('.slider');
  prev = parent.querySelector('.slider__navigation--prev');
  next = parent.querySelector('.slider__navigation--next');
  sliderContent = parent.querySelector('.slider__content');
}

function translateSlider(translation) {
  sliderContent.style = `transform: translateX(${translation}px); transition: 0.3s`;
}

function onPrevClick() {
  const { scroll, width } = instance;
  instance.scroll = scroll + (width / 4 + 40 / 4);
  translateSlider(instance.scroll);
}

function onNextClick() {
  const { scroll, width } = instance;
  instance.scroll = scroll - (width / 4 + 40 / 4);
  translateSlider(instance.scroll);
}

function initInstance() {
  instance = {
    node: sliderContent,
    scroll: 0,
    width: sliderContent.offsetWidth,
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
