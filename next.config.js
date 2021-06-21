'use strict';

module.exports = {
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
