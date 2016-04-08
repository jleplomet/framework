
const WebGLDetector = {};

export function detectDevice(ua, os, osVersion) {
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const dpr = window.devicePixelRatio;
  const long_ = Math.max(screenWidth, screenHeight);
  const short_ = Math.min(screenWidth, screenHeight);
  const retina = dpr >= 2;
  const longEdge = Math.max(long_, short_); // iPhone 4s: 480, iPhone 5: 568

  initWebGLDetector();

  switch (os) {
    case 'iOS':
      return detectIOSDevice(ua.toLowerCase(), retina, longEdge, osVersion);
  }
}

function detectIOSDevice(ua, retina, longEdge, osVersion) {
  const glVersion = WebGLDetector["WEBGL_VERSION"] || "";

  const SGX543 = /543/.test(glVersion); // iPhone 4s/5/5c, iPad 2/3, iPad mini
  const SGX554 = /554/.test(glVersion); // iPad 4
  const A7     = /A7/.test(glVersion);  // iPhone 5s, iPad mini 2/3, iPad Air
  const A8X    = /A8X/.test(glVersion); // A8X, iPad Air 2
  const A8     = /A8/.test(glVersion);  // A8,  iPhone 6/6+, iPad mini 4, iPod touch 6
  const A9X    = /A9X/.test(glVersion); // A9X, iPad Pro, iPad Pro 9.7
  const A9     = /A9/.test(glVersion);  // A9,  iPhone 6s/6s+/SE

  console.log(glVersion);

  //
  // | Device                   | zoom | longEdge | width x height |
  // |--------------------------|------|----------|----------------|
  // | iPhone 3/3GS             |      | 480      |   320 x 480    |
  // | iPhone 4/4s/5/5c/5s/SE   |      | 568      |   320 x 568    |
  // | iPhone 6/6s              |      | 667      |   375 x 667    |
  // | iPhone 6/6s              | YES  | 568      |   320 x 568    |
  // | iPhone 6+/6s+            |      | 736      |   414 x 736    |
  // | iPhone 6+/6s+            | YES  | 667      |   375 x 667    |
  // | iPad 1/2/mini            |      | 1024     |   768 x 1024   |
  // | iPad 3/4/Air/mini2/Pro9.7|      | 1024     |   768 x 1024   |
  // | iPad Pro                 |      | 1366     |  1024 x 1366   |

  if (/iphone/.test(ua)) {
    return !retina ? "iPhone 3GS" :
      longEdge <= 480 ? (SGX543 || osVersion >= 8 ? "iPhone 4s" : "iPhone4") :
      longEdge <= 568 ? (A9 ? "iPhone SE" :
                         A8 ? "iPhone 6"  :
                         A7 ? "iPhone 5s" :
                         SGX543 ? "iPhone 5" : "Unknown") :
      longEdge <= 667 ? (A9 ? "iPhone 6s" :
                         A8 ? "iPhone 6"  : "Unknown") :
      longEdge <= 736 ? (A9 ? "iPhone 6s Plus": "iPhone 6 Plus") : "Unknown";
  } else if (/ipad/.test(ua)) {
    return !retina ? "iPad 2" :
      SGX543 ? "iPad 3" :
      SGX554 ? "iPad 4" :
      A7 ? "iPad Air" :
      A8X ? "iPad Air 2" :
      A8 ? "iPad Mini 4" :
      A9X ? (longEdge <= 1024 ? "iPad Pro 9.7" : "iPad Pro") : "Unknown";
  }
}

function initWebGLDetector() {
  const canvas = document.createElement("canvas");
  const idents = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];

  idents.forEach(ctx => {
    const gl = canvas.getContext(ctx);

    if (gl) {
      WebGLDetector["WEBGL_CONTEXT"] = ctx;
      WebGLDetector["WEBGL_VERSION"] = gl["getParameter"](gl["VERSION"]);
      // WebGLDetector["WEBGL_VENDOR"] = gl["getParameter"](gl["UNMASKED_VENDOR_WEBGL"]);
      // WebGLDetector["WEBGL_RENDERER"] = gl["getParameter"](gl["UNMASKED_RENDERER_WEBGL"]);
      // WebGLDetector["WEBGL_SL_VERSION"] = gl["getParameter"](gl["SHADING_LANGUAGE_VERSION"]);
      // WebGLDetector["MAX_TEXTURE_SIZE"] = gl["getParameter"](gl["MAX_TEXTURE_SIZE"]);
      WebGLDetector["DETECTED"] = true;
    }
  });
}

String.prototype.strpos = function(str) {
  return this.indexOf(str) !== -1;
}
