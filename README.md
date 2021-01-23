<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://scontent.fmid3-1.fna.fbcdn.net/v/t1.0-9/128100704_126094445973804_1804387544708312989_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeG2jya-2NOJnNG3qwwMAeSH0TeFneKnZoLRN4Wd4qdmgmK2riqKvdO77NJGcArzi-gx-xupt8CkD5WAKlU5ISQh&_nc_ohc=4pUdqJx2m4IAX_rcmrw&_nc_ht=scontent.fmid3-1.fna&oh=6a72c9029057d17034a20194929a2a50&oe=5FEC689F" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

 
## Description

[Muuyal](https://github.com/nestjs/nest) 

## Development

```bash
$ npm install

mkdir /var/www
mkdir /var/www/CSD <= include csd of rfc test
mkdir /var/www/facturas
mkdir /var/www/logos <= include logo.png
mkdir /var/www/uploads
mkdir /var/www/uploads/temp
mkdir /var/www/pdc
chmod 777 -R /var/www/pdc
mkdir /var/www/pdc/comprobantes/
mkdir /var/www/pdc/comprobantes/academias
mkdir /var/www/pdc/comprobantes/tienda
```

## Running the app

```bash
# development
$ npm run start

# watch mode development
$ npm run start:dev

# production mode
$ npm run build
$ pm2 start ecosystem.config.js --env production
more CLI
$ pm2 restart ecosystem.config.js --env production
$ pm2 reload  ecosystem.config.js --env production
$ pm2 delete  ecosystem.config.js --env production
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TypeORM

Copy and paste. env.example to configure TYPEORM

```bash
db={env} npm run typeorm
db={env} npm run typeorm:migrate "name"
db={env} npm run typeorm:run
db={env} npm run typeorm:revert

npm run orm --config *.env
npm run orm:migrate "name"
npm run orm:run --config *.env
npm run orm:revert --config *.env
npm run orm:drop --config *.env
npm run orm:sync --config *.env

npm run seeds:run --configName *.env
```


## Run Seed For Deafault Routes

```bash
#name for class seed to run
db={env} npm run seed BranchOfficeInsertUpdateSeed
db={env} npm run seed BranchOfficeSettingInsertUpdateSeed
db={env} npm run seed RouteInsertUpdateSeed
db={env} npm run seed ActionInsertUpdateSeed
db={env} npm run seed RouteActionInsertUpdateSeed
db={env} npm run seed RolesInsertUpdateSeed
db={env} npm run seed DepartmentsInsertUpdateSeed
db={env} npm run seed PermissionsInsertUpdateSeed
db={env} npm run seed UsersInsertUpdateSeed

```
## Support

## License
