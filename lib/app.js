'use strict';

import React from 'react';
import Router from 'react-router';
import routes from './routes';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

/**
 * For the React Chrome addon
 */
window.React = React;

/**
 * React render error callback
 * @param err
 * @returns {*}
 */
function onRenderError(err) {
  if (err) {
    return console.error(err);
  }
}
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

/**
 * Rendering the app to the site's body. Using react-router here.
 */
Router.run(routes, Handler => {
  React.render(
    <Handler/>,
    document.body,
    onRenderError
  );
});
