module.exports = {
    apps: [
        {
            name: 'airlab-site',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};