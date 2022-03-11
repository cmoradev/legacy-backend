import {MigrationInterface, QueryRunner} from "typeorm";

export class addObjectoImpAndUnitMeasureInProductSale1647033731878 implements MigrationInterface {
    name = 'addObjectoImpAndUnitMeasureInProductSale1647033731878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` DROP FOREIGN KEY `FK_157f3df9174bcd899dd69ca0dd2`");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `calculation`");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `storeInvoiceKeyId`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `objetoImp` varchar(2) NOT NULL DEFAULT '02'");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `objetoImp` varchar(2) NOT NULL DEFAULT '02'");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `unidad` `unidad` varchar(20) NOT NULL DEFAULT 'Pz'");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'H87'");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'H87'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `unitMeasurement` int NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `unitMeasurement` int NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `unidad` `unidad` varchar(20) NOT NULL DEFAULT 'Pieza'");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `objetoImp`");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `objetoImp`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `storeInvoiceKeyId` int NULL");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `calculation` longtext NULL");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD CONSTRAINT `FK_157f3df9174bcd899dd69ca0dd2` FOREIGN KEY (`storeInvoiceKeyId`) REFERENCES `facturacion_claves`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
