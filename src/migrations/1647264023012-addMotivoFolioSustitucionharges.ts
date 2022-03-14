import {MigrationInterface, QueryRunner} from "typeorm";

export class addMotivoFolioSustitucionharges1647264023012 implements MigrationInterface {
    name = 'addMotivoFolioSustitucionharges1647264023012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `motivo` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `folioSustitucion` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `motivo` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `folioSustitucion` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `motivo` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `folioSustitucion` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `keyRegimen` `keyRegimen` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `regimenFiscalReceptor` `regimenFiscalReceptor` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `domicilioFiscalReceptor` `domicilioFiscalReceptor` varchar(5) NULL");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `folioSustitucion`");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `motivo`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `folioSustitucion`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `motivo`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `folioSustitucion`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `motivo`");
    }

}
