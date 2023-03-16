const scrollWithOffset = (element: HTMLElement) => {
  const elementPosition = element.offsetTop - 70;
  window.scroll({
    top: elementPosition,
    behavior: 'smooth',
  });
};

export default scrollWithOffset;
