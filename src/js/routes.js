
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {lazy} from 'js/lib/utils/webpack';

import CoreComponent from 'js/lib/containers/CoreComponent';
import Index from 'js/components/Index';

// Default route setup. Each child route will build into the main js bundle.
// Comment this out if you would like to use the below Code splitting routes.
import About from 'js/components/About';

const routes = (
  <Route path='/' component={CoreComponent}>
    <IndexRoute component={Index} />
    <Route path="about" component={About} />
  </Route>
);

// Code splitting routes
// This will lazy load each child route dynamically while leaving the initial bundle
// as small as possible. Each child route will now be its own JS file that will load
// in on a navigation request.
//
// It will be up to the app on how to handle external assets for these routes but having
// the route mount, check if it needs to load, if so, call a loader to display? If not,
// then continue on.
//
// import About from 'bundle?lazy&name=about-chunk!./components/About';
//
// const routes = (
//   <Route path='/' component={CoreComponent}>
//     <IndexRoute component={Index} />
//     <Route path="about" getComponent={lazy(About)} />
//   </Route>
// );

export default routes;
