import { Variants } from 'framer-motion';

const minimumVisibleElementHeight = 0.3;
const minimumVisibleCardsHeight = 0.1;
const animationDuration = 0.6;
const defaultAnimationDelay = 0.1;

export const viewportProperties = { amount: minimumVisibleElementHeight, once: true };
export const cardViewportProperties = { amount: minimumVisibleCardsHeight, once: true };

export const createAnimateOnScroll = (
  delay: 0 | 0.1 | 0.2 | 0.3 | 0.4 = defaultAnimationDelay
): Variants => {
  return {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: animationDuration,
        delay: delay,
        type: 'ease-out',
      },
    },
  };
};

/*
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll()}
 */
