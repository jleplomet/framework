
import "scss/main";
import "js/plugins";

// might be a bug or something i dont know yet but if you import this function,
// then all images will copy over on build. this is a hack incase you only define
// images in your html file and not in css/js. might need more research on how to
// tell webpack html plugin to read src tags and "require"
import {getImageAsset} from 'js/lib/utils/assets';
//^^^^
//if you use this function somewhere else, you can safely remove this import

import cdnurl from './cdnurl';

console.log(`cdnurl: ${cdnurl}`);

// getImageAsset assumes image folder so its ok to not include it.
console.log(getImageAsset('screenshots/1.png'));
