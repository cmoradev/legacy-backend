module.exports = {
    apps: [
        {
            name: 'colegio-api-core-3000',
            script: 'dist/main.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'rancho-4000',
            script: 'dist/main.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'rancho',
            },
        },
        {
            name: 'refaccionaria-5000',
            script: 'dist/main.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'refaccionaria',
            },
        },
        {
            name: 'tortilleria-4500',
            script: 'dist/main.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'tortilleria',
            },

        },
        {
            name: 'development-2500',
            script: 'dist/main.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            args: 'one two',
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

        }],
};
