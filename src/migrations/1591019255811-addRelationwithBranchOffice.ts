import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationwithBranchOffice1591019255811 implements MigrationInterface {
    name = 'addRelationwithBranchOffice1591019255811'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `academyPaymentOfficeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `academyPaymentOfficeSetId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` ADD `academyBranchOfficeSetId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_charges` ADD `schoolBranchOfficeSetId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `schoolPaymentOfficeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `schoolPaymentOfficeSetId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD CONSTRAINT `FK_efa27ce918ac3c762db32178f9c` FOREIGN KEY (`academyPaymentOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD CONSTRAINT `FK_349e4a2374c16854275c18dc1a8` FOREIGN KEY (`academyPaymentOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` ADD CONSTRAINT `FK_363dbb3735ba8dec29fd2e22e10` FOREIGN KEY (`academyBranchOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `school_charges` ADD CONSTRAINT `FK_a0fe26571f2c0f90c19440d90a4` FOREIGN KEY (`schoolBranchOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_8e232bd956d9620757bd7996105` FOREIGN KEY (`schoolPaymentOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_6c95fd4451b912c3953b12c5345` FOREIGN KEY (`schoolPaymentOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_6c95fd4451b912c3953b12c5345`", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_8e232bd956d9620757bd7996105`", undefined);
        await queryRunner.query("ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_a0fe26571f2c0f90c19440d90a4`", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` DROP FOREIGN KEY `FK_363dbb3735ba8dec29fd2e22e10`", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP FOREIGN KEY `FK_349e4a2374c16854275c18dc1a8`", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP FOREIGN KEY `FK_efa27ce918ac3c762db32178f9c`", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `schoolPaymentOfficeSetId`", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `schoolPaymentOfficeId`", undefined);
        await queryRunner.query("ALTER TABLE `school_charges` DROP COLUMN `schoolBranchOfficeSetId`", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` DROP COLUMN `academyBranchOfficeSetId`", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `academyPaymentOfficeSetId`", undefined);
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `academyPaymentOfficeId`", undefined);
    }

}
