import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolPaymentConceptManyToOne1597953046108 implements MigrationInterface {
    name = 'SchoolPaymentConceptManyToOne1597953046108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP FOREIGN KEY `FK_48b1d2ec14972fe5ad137248fb4`");
        await queryRunner.query("DROP INDEX `REL_a4cc50b75b7419e73f088d8f31` ON `school_payment`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD CONSTRAINT `FK_1f4a3d79798050fa95c1e1210be` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP FOREIGN KEY `FK_1f4a3d79798050fa95c1e1210be`");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `status` tinyint NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `status` tinyint NOT NULL DEFAULT '1'");
        await queryRunner.query("CREATE INDEX `REL_a4cc50b75b7419e73f088d8f31` ON `school_payment` (`paymentPlanConceptId`)");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD CONSTRAINT `FK_48b1d2ec14972fe5ad137248fb4` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
