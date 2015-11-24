
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import CoreComponent from 'js/lib/CoreComponent';
import Index from 'js/components/Index';

const routes = (
  <Route path='/' component={CoreComponent}>
    <IndexRoute component={Index} />
  </Route>
);

export default routes;
