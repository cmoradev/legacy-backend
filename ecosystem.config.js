module.exports = {
  apps : [{
    name: 'colegio',
    script: 'dist/main.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '4G',
    env_dev: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'rancho',
    script: 'dist/main.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '4G',
    env_dev: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'rancho'
    }
  },
  {
    name: 'refaccionaria-chan',
    script: 'dist/main.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '4G',
    env_dev: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'refaccionaria'
    },
    
  }],
};
