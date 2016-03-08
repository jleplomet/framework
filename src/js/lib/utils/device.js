
String.prototype.strpos = function(str) {
  return this.indexOf(str) !== -1;
}

const USER_AGENT = navigator.userAgent.toLowerCase();

let BROWSER = false;

browser();

/**
 * Determine if current browser vendor is Google Chrome
 * @type {bool}
 */
export const chrome = BROWSER.chrome;

/**
 * Determine if current browser vendor is Safari
 * @type {bool}
 */
export const safari = BROWSER.safari;

/**
 * Determine if current browser vendor is Firefox
 * @type {bool}
 */
export const firefox = BROWSER.firefox;

/**
 * Determine if current browser vendor is IE
 * @type {bool}
 */
export const IE = BROWSER.ie;

/**
 * Determine if current browser vendor is IE 9
 * @type {bool}
 */
export const IE9 = BROWSER.ie9;

/**
 * Determine if current display is retina
 * @return {bool}
 */
export const retina = BROWSER.features.retina();

/**
 * Determine video extension browser supports
 * @type {string}
 */
export const videoExtension = BROWSER.features.video;

/**
 * Determine if current browser supports touch events
 * @type {bool}
 */
export const touch = BROWSER.features.touch;

/**
 * Determine if current browser supports service workers
 * @type {bool}
 */
export const serviceWorker = BROWSER.features.serviceWorker;

/**
 * Determine if current browser supports Web Workers
 * @type {bool}
 */
export const webWorker = BROWSER.features.worker;

function browser() {
  BROWSER = {
    chrome:  searchUA('chrome'),
    safari:  searchUA('safari') && !searchUA('chrome'),
    firefox: searchUA('firefox'),
    ie:      searchUA('msie') || (searchUA('trident') && searchUA('rv:')),
    ie9:     searchUA('msie') && searchUA('9.0'),
    features: {
      retina: () => window.devicePixelRatio > 1,
      serviceWorker: 'serviceWorker' in navigator &&
        (location.protocol === 'https:' ||
         location.hostname === 'localhost' ||
         location.hostname.indexOf('127.') === 0),
      touch: 'ontouchstart' in window,
      webWorker: !!(window.Worker),
      video: (() => {
        let videoElement = document.createElement('video');

        if (!videoElement.canPlayType) {
          return false;
        }

        if (searchUA('chrome')) {
          return 'webm';
        }

        if (searchUA('firefox')) {
          if (videoElement.canPlayType('video/webm; codecs="vorbis,vp8"')) {
            return 'webm';
          }

          return 'ogv';
        }

        return 'mp4';
      })(),
      webgl: (() => {
        try {
          const canvas = document.createElement('canvas');

          return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl') ||
             canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })()
    }
  };
}

function searchUA(val) {
  if (typeof val === 'string') {
    val = [val];
  }

  let i = 0;
  let l = val.length;

  for (; i < l; i++) {
    if (USER_AGENT.strpos(val[i])) {
      return true;
    }
  }

  return false;
}
