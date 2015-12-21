
let _self = false;

String.prototype.strpos = function(e) {
  return this.indexOf(e) != -1;
}

class Device {
  constructor() {
    _self = this;

    this.agent = navigator.userAgent.toLowerCase();

    _buildBrowserObject.call(this);
    _buildSystemObject.call(this);
  }

  /**
   * Shorthand method to access browser object.
   *
   * @param {string} browserId Name of browser to check if currently on
   * @return {?boolean}
   */
  isBrowser(browserId) {
    return _self.browser.hasOwnProperty(browserId) && _self.browser[browserId];
  }

  /**
   * Determine if current system is on a Retina display.
   *
   * @return {?boolean}
   */
  get isRetina() {
    return _self.system.retina();
  }

  /**
   * Return video extension browser supports
   *
   * @return {?string}
   */
  get videoExtension() {
    return _self.system.video;
  }

  /**
   * Determine if current system is Mac OS X
   *
   * return {?boolean}
   */
  get isMac() {
    return _self.system.os === 'mac';
  }

  /**
   * Determine if current browser is IE
   *
   * return {?boolean}
   */
  get isIE() {
    return _self.browser.ie;
  }

  /**
   * Determine if current browser is IE 9 or lower
   *
   * @return {Boolean}
   */
  get isIE9OrLower() {
    return _self.browser.ie9OrLower;
  }

  /**
   * Determine if current browser is IE 9
   *
   * @return {Boolean}
   */
  get isIE9() {
    return _self.browser.ie9;
  }

  /**
   * Determine if current browser is IE 11
   *
   * @return {Boolean}
   */
  get isIE11() {
    return (_self.detect('trident') && _self.detect('rv:'));
  }

  /**
   * Determine if current system is Windows
   *
   * return {?boolean}
   */
  get isWindows() {
    return _self.system.os === 'windows';
  }

  /**
   * Determine if current browser supports Service Worker
   *
   * return {?boolean}
   */
  get serviceWorker() {
    return _self.browser.features.serviceWorker;
  }

  /**
   * Determine if current device is touch enabled
   *
   * @return {Boolean}
   */
  get isTouch() {
    return _self.system.touch;
  }

  /**
   * Determine if WebGL is available
   *
   * @return {Boolean}
   */
  get isWebGlAvaliable() {
    return _self.system.webgl;
  }

  /**
   * Search User Agent string
   *
   * @return {?boolean}
   */
  detect(client) {
    if (typeof client === 'string') {
      client = [client];
    }

    for (let i = 0, l = client.length; i < l; i++) {
      if (this.agent.strpos(client[i])) {
        return true;
      }
    }

    return false;
  }
}

function _buildBrowserObject() {
  let _self = this;
  let location = window.location;

  this.browser = {
    chrome: this.detect('chrome'),
    safari: !this.detect('chrome') && this.detect('safari'),
    firefox: this.detect('firefox'),
    ie: (() => {
      return (_self.detect('msie') ||
        (_self.detect('trident') && _self.detect('rv:')));
    })(),
    ie9: (() => {
      return (_self.detect('msie') && _self.detect('9.0'));
    })(),
    ie9OrLower: (() => {
      return (_self.detect('msie') && (_self.detect('9.0') ||
        _self.detect('8.0') || _self.detect('7.0')));
    })(),
    features: {
      serviceWorker: 'serviceWorker' in navigator &&
        (location.protocol === 'https:' ||
         location.hostname === 'localhost' ||
         location.hostname.indexOf('127.') === 0),
      history: (window.history && 'pushState' in window.history)
    }
  };
}

function _buildSystemObject() {
  this.system = {
    // its possible to have dual monitors and the browser window
    // moves between each. This is a function that will always check
    // devicePixelRatio as it dynamically updates.
    retina: () => window.devicePixelRatio > 1,

    touch: ('ontouchstart' in window),

    webgl: (() => {
      try {
        const canvas = document.createElement('canvas');

        return !!(window.WebGLRenderingContext &&
          (canvas.getContext('webgl') ||
           canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })(),

    video: (() => {
      let videoElement = document.createElement('video');

      if (!videoElement.canPlayType) {
        return false;
      }

      if (this.isBrowser('chrome')) {
        return 'webm';
      }

      if (this.isBrowser('firefox')) {
        if (videoElement.canPlayType('video/webm; codecs="vorbis,vp8"')) {
          return 'webm';
        }

        return 'ogv';
      }

      return 'mp4';
    })(),

    os: (() => {
      if (this.detect('mac os')) {
        return 'mac';
      } else if (this.detect('windows')) {
        return 'windows';
      }

      return undefined;
    })()
  };
}

export default new Device;
