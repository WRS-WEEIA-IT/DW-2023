import { Variants } from 'framer-motion';

const animateOnScroll: Variants = {
  hidden: {
    x: -70,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.1,
      type: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
    },
  },
};

export default animateOnScroll;
