import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationsSchoolPayments1586965123325 implements MigrationInterface {
    name = 'changeRelationsSchoolPayments1586965123325'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` DROP FOREIGN KEY `FK_1ad935791cba586dc0fea1f7e73`", undefined);
        await queryRunner.query("DROP INDEX `REL_1ad935791cba586dc0fea1f7e7` ON `school_payment`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `schoolChargeDetailId`", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_details` ADD `schoolPlanPaymentId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_details` ADD UNIQUE INDEX `IDX_42f725a32538bf2a1aa55a1d8b` (`schoolPlanPaymentId`)", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT '000000000000000'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_42f725a32538bf2a1aa55a1d8b` ON `school_charge_details` (`schoolPlanPaymentId`)", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_details` ADD CONSTRAINT `FK_42f725a32538bf2a1aa55a1d8bb` FOREIGN KEY (`schoolPlanPaymentId`) REFERENCES `school_payment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_charge_details` DROP FOREIGN KEY `FK_42f725a32538bf2a1aa55a1d8bb`", undefined);
        await queryRunner.query("DROP INDEX `REL_42f725a32538bf2a1aa55a1d8b` ON `school_charge_details`", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_details` DROP INDEX `IDX_42f725a32538bf2a1aa55a1d8b`", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_details` DROP COLUMN `schoolPlanPaymentId`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `schoolChargeDetailId` int NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_1ad935791cba586dc0fea1f7e7` ON `school_payment` (`schoolChargeDetailId`)", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD CONSTRAINT `FK_1ad935791cba586dc0fea1f7e73` FOREIGN KEY (`schoolChargeDetailId`) REFERENCES `school_charges_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
