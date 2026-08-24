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

Para desarrollo local sin Docker, instala dependencias y crea los directorios
que la aplicación usa para almacenar facturas, uploads y recursos de firmado:

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

> **Nota:** Si utilizas Docker (ver sección [Docker](#docker)), **no es necesario**
> crear estos directorios manualmente en `/var/www`. Los volúmenes del contenedor
> montan `./storage` en `/app/storage/`, y las rutas internas ya apuntan a ese
> directorio en lugar de a `/var/www`.

## Docker

El proyecto incluye `Dockerfile`, `docker-compose.yml` y `.dockerignore`
configurados para facilitar el levantamiento del entorno de desarrollo.

### Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) (Engine 20.10+ recomendado)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+ recomendado)

### Inicializar storage

Antes de levantar los contenedores por primera vez, crea la estructura de
directorios que la aplicación utiliza para almacenar facturas, comprobantes,
archivos XSLT, CSD y otros recursos:

```bash
$ npm run init:storage
```

Este comando crea los directorios necesarios dentro de `storage/`. El script es
idempotente: puede ejecutarse múltiples veces sin riesgo de borrar contenido
existente.

> **Nota:** Los archivos XSLT, CSD, logos y demás recursos deben ser colocados
> manualmente por el usuario según su configuración particular. El script solo
> crea la estructura de directorios vacía.

### Configuración del entorno

1. Inicializa la estructura de storage:

```bash
$ npm run init:storage
```

2. Copia el archivo de ejemplo de variables de entorno y ajusta los valores:

```bash
$ cp .env.example .env
# Edita .env con tus valores:
#   API_PORT, API_SECRET, DB_HOST, DB_PORT, DB_USERNAME,
#   DB_PASSWORD, DB_DBNAME, DB_DBNAME_CONNECTION, API_AUTH_ENABLED, ...
```

Las variables relevantes para el contenedor son pasadas automáticamente desde
`.env` (ver `docker-compose.yml`).

### Construir y levantar los contenedores

```bash
# Construir la imagen (en primer arranque o tras cambios en el Dockerfile)
$ docker compose build

# Levantar en segundo plano
$ docker compose up -d

# Levantar en primer plano (muestra los logs en la terminal actual)
$ docker compose up
```

### Acceder a la aplicación

Por defecto la API expone el puerto configurado en `API_PORT` (3000 si no se
define). Una vez levantado el contenedor, la aplicación está disponible en:

```
http://localhost:3000
```

### Ver los logs

```bash
# Logs en tiempo real (todas las servicios)
$ docker compose logs -f

# Logs solo de la API
$ docker compose logs -f erp-api

# Últimas N líneas
$ docker compose logs --tail=200 erp-api
```

### Detener los contenedores

```bash
# Detener manteniendo los volúmenes e imagen
$ docker compose stop

# Detener y eliminar los contenedores (mantiene volúmenes e imagen)
$ docker compose down

# Detener y eliminar también los volúmenes (¡borra datos persistentes!)
$ docker compose down -v
```

### Volúmenes y hot-reload en desarrollo

El `docker-compose.yml` monta los siguientes directorios del host dentro del
contenedor para reflejar los cambios en tiempo real:

| Host        | Contenedor     | Descripción                                   |
|-------------|----------------|-----------------------------------------------|
| `./src`     | `/app/src`     | Código fuente (hot-reload con `start:dev`)    |
| `./public`  | `/app/public`  | Assets públicos                               |
| `./storage` | `/app/storage` | Facturas, uploads, logos, CSD, XSLT, etc.     |

Como el contenedor ejecuta `npm run start:dev`, los cambios en `./src` se
recompilan automáticamente sin necesidad de reiniciar el contenedor.

> **Importante:** Dentro del contenedor las rutas de firmado y almacenamiento
> usan `/app/storage/` (no `/var/www/`). Asegúrate de ubicar en `./storage`
> los recursos que la aplicación espera (logos, CSD, XSLT, comprobantes, etc.).

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
db={env} npm run seed SystemTypeExtraChargesSeed
db={env} npm run seed AcademyModalitiesSeed
db={env} npm run seed ShiftInserUpdateSeed
db={env} npm run seed ConceptTypeInserUpdateSeed
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
// iTeck2014$
npm run caps --muunyalapi:VAR=foo
// borrar esta lineas cuando el pdf de signati este completo
"rootDir": "./src",
"allowJs": true,
"include": [
"src/**/*"
],
