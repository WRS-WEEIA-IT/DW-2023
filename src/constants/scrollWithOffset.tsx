const scrollWithOffset = (element: HTMLElement) => {
  const elementPosition = element.offsetTop - 40;
  window.scroll({
    top: elementPosition,
    behavior: 'smooth',
  });
};

export default scrollWithOffset;
