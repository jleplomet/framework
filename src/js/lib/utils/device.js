
import {detectDevice} from 'js/lib/utils/helpers';

const USER_AGENT = navigator.userAgent.toLowerCase();

let BROWSER = false;
let SYSTEM  = false;

detectBrowser();
detectSystem();

/**
 * Determine if current browser vendor is Google Chrome
 * @type {bool}
 */
export const chrome = BROWSER.browser.chrome;

/**
 * Determine if current browser vendor is Safari
 * @type {bool}
 */
export const safari = BROWSER.browser.safari;

/**
 * Determine if current browser vendor is Firefox
 * @type {bool}
 */
export const firefox = BROWSER.browser.firefox;

/**
 * Determine if current browser vendor is Microsoft Edge
 * @type {bool}
 */
export const Edge = BROWSER.browser.edge; 

/**
 * Determine if current browser vendor is IE
 * @type {bool}
 */
export const IE = BROWSER.browser.ie;

/**
 * Determine if current browser vendor is IE 9
 * @type {bool}
 */
export const IE9 = BROWSER.browser.ie9;

/**
 * [browserVersion description]
 * @type {[type]}
 */
export const browserVersion = BROWSER.browser.version;

/**
 * Determine if current display is retina
 * @return {function}
 */
export const retina = BROWSER.features.retina;

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
 * Determine if current device is mobile phone
 * @type {bool}
 */
export const phone = SYSTEM.mobile.phone;

/**
 * Determine if current device is mobile tablet
 * @type {bool}
 */
export const tablet = SYSTEM.mobile.tablet;

/**
 * Determine mobile device
 *
 * @type {string}
 */
export const device = SYSTEM.mobile.device;

/**
 * Determine if current browser supports service workers
 * @type {bool}
 */
export const serviceWorker = BROWSER.features.serviceWorker;

/**
 * Determine if current browser supports Web Workers
 * @type {bool}
 */
export const webWorker = BROWSER.features.webWorker;

/**
 * Determine if current browser supports WebGL
 * @type {bool}
 */
export const webGL = BROWSER.features.webGL;

/**
 * Determine current OS
 * @type {string}
 */
export const os = SYSTEM.os;

/**
 * Determine current OS version
 * @type {number|string}
 */
export const osVersion = SYSTEM.osVersion;

function detectBrowser() {
  BROWSER = {
    browser: {
      chrome:  searchUA('chrome'),
      safari:  searchUA('safari') && !searchUA('chrome'),
      firefox: searchUA('firefox'),
      edge:    searchUA('windows') && searchUA('edge'),
      ie:      searchUA('msie') || (searchUA('trident') && searchUA('rv:')),
      ie9:     searchUA('msie') && searchUA('9.0')
    },
    features: {
      retina: () => window.devicePixelRatio > 1,
      serviceWorker: 'serviceWorker' in navigator &&
        (location.protocol === 'https:' ||
         location.hostname === 'localhost' ||
         location.hostname.indexOf('127.') === 0),
      touch: 'ontouchstart' in window,
      webWorker: typeof window.Worker !== "undefined",
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
      webGL: (() => {
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

  // detect browser version after BROWSER is created
  BROWSER.browser.version = (() => {
    let version = -1;
    try {
      const {browser} = BROWSER;

      if (browser.chrome) {
        return Number(USER_AGENT.split("chrome/")[1].split(".")[0]);
      } else if (browser.safari) {
        return Number(USER_AGENT.split("version/")[1].split(".")[0].charAt(0));
      } else if (browser.firefox) {
        return Number(USER_AGENT.split("firefox/")[1].split(".")[0]);
      }

      // dont  care about IE at the moment.

      return version;
    } catch (e) { return version; }
  })();
}

function detectSystem() {
  const iOSDevices = ["ios", "iphone", "ipad", "ipod"];

  SYSTEM = {
    mobile: (() => {
      const type = {tablet: false, phone: false};

      if (!!(("ontouchstart"in window) || ("onpointerdown"in window)) &&
        searchUA([...iOSDevices, "windows", "android", "blackberry"])) {
        if (screen.width > 1000 || screen.height > 900) {
          type.tablet = true;
        }

        type.phone = true;
      }

      return type;
    })(),
    os: (() => {
      if (searchUA('mac os') && !searchUA(iOSDevices)) {
        return 'Mac';
      } else if (searchUA(iOSDevices)) {
        return 'iOS';
      } else if (searchUA('android')) {
        return 'Android';
      }
      else if (searchUA('windows')) {
        return 'Windows';
      }

      return undefined;
    })()
  };

  // detect OS version after SYSTEM is created.
  SYSTEM.osVersion = (() => {
    if (SYSTEM.os === 'iOS') {
      const version = USER_AGENT.split("os ")[1].split("_");
      const major = version[0];
      const minor = version[1].split(" ")[0];

      return Number(major + "." + minor);
    } else if (SYSTEM.os === 'Android') {
      let version = USER_AGENT.split("android ")[1].split(";")[0];

      if (version.length > 3) {
        version = version.slice(0, -2);
      }

      return Number(version);
    }

    return "unknown";
  })();

  // detect mobile device type
  if (SYSTEM.mobile.tablet || SYSTEM.mobile.phone) {
    if (SYSTEM.os === 'iOS') {
      SYSTEM.mobile.device = detectDevice(USER_AGENT, 'iOS', SYSTEM.osVersion);
    }
    // TODO: figure out Android device
  }
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
