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
  sliderContent.style = `transform: translateX(${translation}%); transition: 1s`;
}

function onPrevClick() {
  const { scroll } = instance;
  instance.scroll = scroll + 26;
  translateSlider(instance.scroll);
}

function onNextClick() {
  const { scroll } = instance;
  instance.scroll = scroll - 26;
  translateSlider(instance.scroll);
}

function subscribe(object) {
  prev.addEventListener('click', () => onPrevClick(object));
  next.addEventListener('click', () => onNextClick(object));
}

export default function init() {
  findElements();
  instance = { node: sliderContent, scroll: 0 };
  subscribe(instance);
}
