module.exports = {
  apps: [
    {
      name: 'airlab-site',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
