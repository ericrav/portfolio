import React from 'react';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import App from './App';
import styles from '../styles/main.scss';

var app = (
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
);

if (typeof document !== 'undefined') {
  render(app, document.getElementById('app'));
}

const template = (htmlRenderedByReact, assets) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Eric Rabinowitz</title>
    <link rel="stylesheet" href="https://use.typekit.net/tuk1pra.css">
    <style>${styles}</style>
  </head>
  <body ontouchstart="">
    <div id='app'>${htmlRenderedByReact}</div>
    <script src='${assets.main}'></script>
    <!-- Global Site Tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-48127888-4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)};
      gtag('js', new Date());

      gtag('config', 'UA-48127888-4');
    </script>
  </body>
  </html>
`;

// Exported static site renderer:
export default (locals, callback) => {
  console.log(locals.assets);
  callback(null, template(
    ReactDOMServer.renderToString(<App />),
    locals.assets
  ));
};