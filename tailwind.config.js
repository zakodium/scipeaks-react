'use strict';

module.exports = {
  purge: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/ui')],
  theme: {
    extend: {
      colors: {},
    },
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
