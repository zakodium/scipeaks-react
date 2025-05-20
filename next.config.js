module.exports = {
  reactStrictMode: true,
  basePath: process.env.NEXT_BASE_PATH || '',
  output: process.env.NEXT_EXPORT ? 'export' : undefined,
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
