/**
 * 
 * @param {string} src 
 * @param {function} callback 
 */
const load = (src='http://annotorious.github.com/latest/annotorious.min.js') => {
  return new Promise((resolve, reject) => {
    if (window.anno) {
      resolve()
    }

    const onLoadAnnotoriouse = () => {
      resolve();
  
      if (window.LOAD_ANNOTORIOUS_PENDING) {
        window.LOAD_ANNOTORIOUS_PENDING = false;
        const callbacks = window.LOAD_ANNOTORIOUS_CALLBACKS;
  
        if (callbacks && callbacks.length) {
          let currentCallback = callbacks.shift();
          while (currentCallback) {
            currentCallback.func.call(currentCallback.window);
            currentCallback = callbacks.shift();
          }
        }
      }
    }
  
    if (window.LOAD_ANNOTORIOUS_PENDING) {
      window.LOAD_ANNOTORIOUS_CALLBACKS = window.LOAD_ANNOTORIOUS_CALLBACKS || [];
      window.LOAD_ANNOTORIOUS_CALLBACKS.push({
        window: this,
        func: onLoadAnnotoriouse
      })
    } else {
      const scriptElement = window.document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.src = src;
      scriptElement.async = true;
      scriptElement.addEventListener('load', onLoadAnnotoriouse);
      window.LOAD_ANNOTORIOUS_PENDING = true;
      window.document.body.appendChild(scriptElement);
    }
  })
}

export default {
  load
}
