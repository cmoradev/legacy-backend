import {MigrationInterface, QueryRunner} from "typeorm";

export class addUnitMeasureObjectImpAndSatCodeAcademicConcepts1647612157875 implements MigrationInterface {
    name = 'addUnitMeasureObjectImpAndSatCodeAcademicConcepts1647612157875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` DROP COLUMN `codigo_producto`");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` DROP COLUMN `codigo_unidad`");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` DROP COLUMN `unidad`");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `codigo_producto`");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `codigo_unidad`");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `unidad`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `codigo_producto`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `codigo_unidad`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `unidad`");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'E48'");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` ADD `objetoImp` varchar(2) NOT NULL DEFAULT '02'");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` ADD `sat_code` varchar(25) NOT NULL DEFAULT '01010101'");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'E48'");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `objetoImp` varchar(2) NOT NULL DEFAULT '02'");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `sat_code` varchar(25) NOT NULL DEFAULT '01010101'");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'E48'");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `objetoImp` varchar(2) NOT NULL DEFAULT '02'");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `sat_code` varchar(25) NOT NULL DEFAULT '01010101'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `sat_code`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `objetoImp`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `sat_code`");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `objetoImp`");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` DROP COLUMN `sat_code`");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` DROP COLUMN `objetoImp`");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `unidad` varchar(100) NULL");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `codigo_unidad` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `codigo_producto` varchar(70) NULL");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `unidad` varchar(100) NULL");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `codigo_unidad` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `codigo_producto` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` ADD `unidad` varchar(100) NULL");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` ADD `codigo_unidad` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` ADD `codigo_producto` varchar(20) NOT NULL");
    }

}
