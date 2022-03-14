module.exports = {
    apps: [
        {
            name: '5100-erp-development',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '420M',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'development',
            },
        },
    ],
};
