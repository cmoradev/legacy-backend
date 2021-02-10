<p align="center">
  <a href="https://version.muunyal.app" target="blank">
    <img src="https://version.muunyal.app/muunyal.svg" width="320" alt="Muunyal Api Logo" />
  </a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

 
## Description

[Muuyal](https://github.com/DevelopersCI/colegio-api-core) 

## Development

```bash
$ npm install

mkdir /var/www
mkdir /var/www/facturas
mkdir /var/www/uploads
mkdir /var/www/uploads/temp

mkdir /var/www/{folder}
chmod 777 -R /var/www/{folder}
mkdir /var/www/{folder}/logos <= include logo.png
mkdir /var/www/{folder}/comprobantes/
mkdir /var/www/{folder}/comprobantes/academias
mkdir /var/www/{folder}/comprobantes/tienda
mkdir /var/www/{folder}/comprobantes/colegio
mkdir /var/www/{folder}/CSD <= include csd of rfc test

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

# Alternativa
npm run orm --config *.env
npm run orm:migrate "name"
npm run orm:run --config *.env
npm run orm:revert --config *.env
npm run orm:drop --config *.env
npm run orm:sync --config *.env

npm run seeds:run --configName *.env
```


## Run Seed For Deafault Values

```bash
#name for class seed to run
db={env} npm run seed BranchOfficeInsertUpdateSeed
db={env} npm run seed CycleInsertUpdateSeed
db={env} npm run seed BranchOfficeSettingInsertUpdateSeed
db={env} npm run seed RouteInsertUpdateSeed
db={env} npm run seed ActionInsertUpdateSeed
db={env} npm run seed RouteActionInsertUpdateSeed
db={env} npm run seed RolesInsertUpdateSeed
db={env} npm run seed DepartmentsInsertUpdateSeed
db={env} npm run seed PermissionsInsertUpdateSeed
db={env} npm run seed UsersInsertUpdateSeed
db={env} npm run seed KeysInsertUpdateSeed
db={env} npm run seed InvoiceMethodsInsertUpdateSeed
db={env} npm run seed InvoicesBankSeed
```

## Triggers in data base 

```bash
#Academias
db={env} npm run seed BeforeInsertAcChargeTriggerSeed
db={env} npm run seed BeforeInsertAcInvoiceTriggerSeed
db={env} npm run seed BeforeInsertAcPaymentsTriggerSeed
#Colegio
db={env} npm run seed BeforeInsertSchoolChargeTriggerSeed
db={env} npm run seed BeforeInsertSchoolInvoiceTriggerSeed
db={env} npm run seed BeforeInsertSchoolPaymentTriggerSeed
#MiniStore
db={env} npm run seed AfterInsertSaleDetailsMinTriggerSeed
db={env} npm run seed AfterUpdateSaleTriggerSeed
db={env} npm run seed BeforeInsertPedidosTriggerSeed
db={env} npm run seed BeforeInsertSaleTriggerSeed
db={env} npm run seed BeforeInsertSalePaymentTriggerSeed
db={env} npm run seed BeforeInsertSalePaymentInvoiceTriggerSeed
db={env} npm run seed BeforeUpdateSaleUpdateStockOnCancelSaleTriggerSeed
```
## Support

## License


use capecafe;
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `capecafe`.`tie_ventas`;
TRUNCATE `capecafe`.`tie_venta_detalle`;
TRUNCATE `capecafe`.`tie_facturas`;
TRUNCATE `capecafe`.`tie_venta_pagos`;
TRUNCATE `capecafe`.`tie_venta_forma_pago`;
TRUNCATE `capecafe`.`mini-store-details-extra-charges`;
TRUNCATE `capecafe`.`mini_store_quotation`;


// para nuevo ingreso
// por nuevo ingreso
// calcular el iva de los conceptos agregado
// studyPlans en cobros falta relacionar con el plan de estudio
