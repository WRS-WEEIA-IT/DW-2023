import { Variants } from 'framer-motion';

const minimumVisibleElementHeight = 0.3;
const animationDuration = 0.6;
const animationDelay = 0.1;

export const viewportProperties = { amount: minimumVisibleElementHeight, once: true };

export const animateOnScroll: Variants = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationDuration,
      delay: animationDelay,
      type: 'ease-out',
    },
  },
};
