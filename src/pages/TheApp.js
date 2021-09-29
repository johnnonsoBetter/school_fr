import React from 'react';

import {MainApplication} from './Main';

function subdomainApplications (map) {
  let main = map.find((item)=> item.main);
  if (!main) {
    throw new Error('Must set main flag to true on at least one subdomain app');
  }

  return function getComponent () {
    const parts = window.location.hostname.split('.');

    let last_index = -2;
    const last = parts[parts.length - 1];
    const is_localhost = last === 'localhost';
    if (is_localhost) {
      last_index = -1;
    }

    const subdomain = parts.slice(0, last_index).join('.');

    if (!subdomain) {
      return main.application;
    }

    const app = map.find(({subdomains})=> subdomains.includes(subdomain));
    if (app) {
      return app.application;
    } else {
      return main.application;
    }
  }
}

const getApp = subdomainApplications([
  {
    subdomains: ['www'],
    application: function () {
      return 'Main!'
    },
    main: true
  },
  {
    subdomains: ['foo'],
    application: function () {
      return 'Foo!';
    }
  }
]);

export default function Application () {
  const App = getApp();
  return (
    <App className="Application" />
  );
}