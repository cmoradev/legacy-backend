import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationQuinkSale1590257162518 implements MigrationInterface {
    name = 'addRelationQuinkSale1590257162518';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `isQuickSale` tinyint(1) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `quickSaleMethodId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD CONSTRAINT `FK_5a83ff2479cbfcbeaaa50b66c32` FOREIGN KEY (`quickSaleMethodId`) REFERENCES `facturacion_formas_pago`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP FOREIGN KEY `FK_5a83ff2479cbfcbeaaa50b66c32`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `quickSaleMethodId`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `isQuickSale`', undefined);
    }

}
