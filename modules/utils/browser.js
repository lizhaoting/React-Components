export const isDraggableSupport = (function () {
  const div = document.createElement('div');
  return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
}());

export const isFileReaderSupport = 'FileReader' in window;

export const isIE =
  /** for IE < 11 */
  (navigator && navigator.userAgent.indexOf('MSIE') >= 0) ||
  /**
   * IE 11 has special userAgent, use following way to detect
   * see: [http://stackoverflow.com/questions/21825157/internet-explorer-11-detection]
   */
  (!!window.MSInputMethodContext && !!document.documentMode);

export const isFirefox = navigator.userAgent.indexOf('Firefox') >= 0;

export const isServiceWorkerSupport = ('serviceWorker' in navigator);

// 为text area 提供兼容性所有浏览器的 place holder.
export const supportPlaceholder = (ele, tips) => {
  const elem = ele;
  if (elem && document.activeElement !== elem) { // && !('placeholder' in elem)
    const txt = tips; // elem.getAttribute('data_placeholder');
    if (elem.value === '') {
      elem.value = txt;
      elem.setAttribute('style', 'color: #bbb !important');
    }// ele.getAttribute('text');
    elem.onfocus = () => {
      if (elem.value === txt) {
        elem.value = '';
      }
      elem.setAttribute('style', 'color: #000 !important');
    };
    elem.onblur = () => {
      if (elem.value === '') {
        elem.value = txt;
        elem.setAttribute('style', 'color: #bbb !important');
      }
    };
  }
};

