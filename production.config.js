module.exports = {
    apps: [
        {
            name: '3000-colegio-api-core',
            script: 'dist/main.js',
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
            name: '4500-tortilleria',
            script: 'dist/main.js',
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
            name: '6500-pachamama',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'pachamama',
            },
        },
        {
            name: '4000-rancho',
            script: 'dist/main.js',
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
            name: '5000-refaccionaria',
            script: 'dist/main.js',
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
            name: '1500-cremeria',
            script: 'dist/main.js',
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            env_dev: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'cremeria',
            },

        },
    ],
};
