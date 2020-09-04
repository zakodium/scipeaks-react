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
    removeDeprecatedGapUtilities: true,
  },
};
