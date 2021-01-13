module.exports = {
    apps: [
        {
            name: '2500-development',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'desarrollo',
            },

        },
    ],
};
