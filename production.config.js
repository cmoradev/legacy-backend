module.exports = {
  apps: [
    {
      name: '3300-herbart',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'herbart',
      },
    },
    {
      name: '3200-kiinbeh',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'kiinbeh',
      },
    },
    {
      name: '5101-erp-ci-pdc',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'cipdc',
      },
    },
    {
      name: '5102-erp-ci-tul',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'citul',
      },
    },
    {
      name: '5103-erp-naturale',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'naturale',
      },
    },
    {
      name: '5104-erp-pachamama',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'pachamama',
      },
    },
    {
      name: '5105-erp-refaccionaria',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'refaccionaria',
      },
    },
    {
      name: '5106-erp-pachamama2',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '420M',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'pachamama2',
      },
    },
  ],
};
