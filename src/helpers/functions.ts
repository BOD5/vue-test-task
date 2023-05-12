export const encodeQueryData = (data: { [key: string]: any }) => {
  const ret = Object.keys(data).map(
    (key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  );
  return ret.join('&');
};
export const isWebp = () => {
  const testWebp = (callback: (p: boolean) => void) => {
    const webp = new Image();
    webp.onload = webp.onerror = () => callback(webp.height == 2);
    webp.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  testWebp((support: boolean) => {
    const className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
};
