import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

// Default config (can be overridden by pages)
// https://vike.dev/config
const config: Config = {
  prerender: {
    enable: true,
    noExtraDir: true,
  },

  title: 'SciPeaks',

  extends: vikeReact,

  redirects: {
    '/': '/dev/home',
  },
};

export default config;
