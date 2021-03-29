'use strict';

module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_BASE_PATH || '',
  redirects() {
    return [
      {
        source: '/',
        destination: '/dev/home',
        permanent: false,
      },
    ];
  },
};
