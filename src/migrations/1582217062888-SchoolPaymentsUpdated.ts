import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolPaymentsUpdated1582217062888 implements MigrationInterface {
    name = 'SchoolPaymentsUpdated1582217062888'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` ADD `paidDay` date NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `satCode` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `paymentPlanConceptId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD UNIQUE INDEX `IDX_a4cc50b75b7419e73f088d8f31` (`paymentPlanConceptId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_a4cc50b75b7419e73f088d8f31` ON `school_payment` (`paymentPlanConceptId`)", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD CONSTRAINT `FK_a4cc50b75b7419e73f088d8f313` FOREIGN KEY (`paymentPlanConceptId`) REFERENCES `payment_plan_concept`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` DROP FOREIGN KEY `FK_a4cc50b75b7419e73f088d8f313`", undefined);
        await queryRunner.query("DROP INDEX `REL_a4cc50b75b7419e73f088d8f31` ON `school_payment`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP INDEX `IDX_a4cc50b75b7419e73f088d8f31`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `paymentPlanConceptId`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `satCode`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `paidDay`", undefined);
    }

}
