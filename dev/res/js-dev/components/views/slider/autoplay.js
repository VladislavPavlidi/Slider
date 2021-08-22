// eslint-disable-next-line import/no-cycle
import { isLastSlide, setStartSliderCondition, onNextClick } from './index';

const AUTO_PLAY_TIME = 4000;

export default function startAutoplay(object) {
  const instance = object;
  const { activeIndex, slidesCount } = object;
  clearTimeout(instance.timeout);
  instance.timeout = setTimeout(() => {
    if (activeIndex === slidesCount || isLastSlide()) {
      setStartSliderCondition();
    } else {
      onNextClick(true);
    }
  }, AUTO_PLAY_TIME);
}
