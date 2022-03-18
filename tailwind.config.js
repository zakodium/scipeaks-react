module.exports = {
  presets: [require('@zakodium/tailwind-config')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/react-iframe-bridge/lib/**/*.js',
  ],
};
