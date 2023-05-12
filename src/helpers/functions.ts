export const encodeQueryData = (data: { [key: string]: any }) => {
  const ret = Object.keys(data).map(
    (key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  );
  return ret.join('&');
};
