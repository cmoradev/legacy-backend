import { MigrationInterface, QueryRunner } from 'typeorm';

export class removefloatdeciamlAcademy1581530233428 implements MigrationInterface {
    name = 'removefloatdeciamlAcademy1581530233428';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` decimal(15,6) NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` decimal(15,6) NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` CHANGE `precio`  `precio` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_cobros` DROP COLUMN `cambio`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` ADD `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` DROP COLUMN `cantidad`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` ADD `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` DROP COLUMN `precio`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` ADD `precio` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP COLUMN `precio`', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `oldprecio`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD `oldprecio` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `precio`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    }

}
