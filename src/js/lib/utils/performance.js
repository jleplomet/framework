
import * as device from 'js/lib/utils/device';

let PERFORMANCE = false;

detectPerformance();

export const FULL = 'FULL';

export const LIMITED = 'LIMITED';

export const particles = PERFORMANCE.particles;

export const postprocessing = PERFORMANCE.postprocessing;

// this utility will change depeneding on the project
// it is mostly used to detect performance of mobile devices
// as we cannot fully detect all desktops/macs

function detectPerformance() {
  const badMB = device.os === "Mac" && (!device.retina || device.retina) &&
    screen.width === 1280 && screen.height === 800;
  const mbAir = device.os === "Mac" && !device.retina &&
    screen.width === 1440 && screen.height === 900;

  PERFORMANCE = {

    particles: (() => {
      let enable = true;

      // disable particles on phone/tablet devices
      if (device.phone || device.tablet || !device.webWorker) {
        enable = false
      }

      return enable;
    })(),

    postprocessing: (() => {
      let enable = "FULL";
      
      // these macbooks do not have all the power
      if (badMB || mbAir) {
        enable = "LIMITED";
      }

      // disable post processing effects on phone devices
      if (device.phone) {
        enable = false;
      }
      
      // enable limited post processing if we are on  an 5s, 6, 6 Plus device
      if (device.phone && device.os === "iOS" &&
         (device.device === "iPhone 5s" ||
          device.device === "iPhone 6" ||
          device.device === "iPhone 6 Plus")) {
        enable = "LIMITED";      
      }

      // enable post processing if we are on an 6[s] device
      // or the new 5 SE device
      if (device.phone && device.os === "iOS" &&
         (device.device === "iPhone 6s Plus" || 
          device.device === "iPhone 6s" ||
          device.device === "iPhone 5 SE")) {
        enable = "FULL";
      }

      // disable post processing effects on tablet devices
      if (device.tablet) {
        enable = false;
      }
      
      // enable limited post processing on an iPad Air
      // iPad Air device also is the same for iPad Mini 2/3
      if (device.tablet && device.os === "iOS" && (device.device === "iPad Air")) {
        enable = "LIMITED";
      }

      // enable post processing if we are on an iPad Pro, iPad Pro 9.7, iPad Air 2
      if (device.tablet && device.os === "iOS" &&
         (device.device === "iPad Air 2" ||
          device.device === "iPad Pro 9.7" ||
          device.device === "iPad Pro")) {
        enable = "FULL";
      }

      return enable;
    })()
  };

  console.log(PERFORMANCE);
}
