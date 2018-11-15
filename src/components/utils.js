import 'whatwg-fetch'

const loadImage = (src) => {
  return fetch(src).then(res => {
    if (res.status === 200) {
      return res.blob();
    } else {
      throw new Error(`can not load image ${src}`);
    }
  }).then(binary => {
    return URL.createObjectURL(binary);
  });
}


export {
  loadImage
}
