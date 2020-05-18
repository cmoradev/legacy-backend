import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBrachOffSettingsModules1589829628363 implements MigrationInterface {
    name = 'addBrachOffSettingsModules1589829628363';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD `storeBranchOfficeSetId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD `storePaymentOfficeSetId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_16059ec2a5ca8713d0b7bbf3175` FOREIGN KEY (`storeBranchOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_33f013799929f236bb0ca1eb093` FOREIGN KEY (`storePaymentOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_33f013799929f236bb0ca1eb093`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_16059ec2a5ca8713d0b7bbf3175`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP COLUMN `storePaymentOfficeSetId`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `storeBranchOfficeSetId`', undefined);
    }

}
