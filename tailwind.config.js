'use strict';

module.exports = {
  presets: [require('@zakodium/tailwind-config')],
  mode: 'jit',
  purge: [
    './src/**/*.{ts,tsx}',
    './node_modules/react-iframe-bridge/lib/**/*.js',
  ],
};
