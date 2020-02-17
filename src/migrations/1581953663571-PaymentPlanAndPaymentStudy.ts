import {MigrationInterface, QueryRunner} from 'typeorm';

export class PaymentPlanAndPaymentStudy1581953663571 implements MigrationInterface {
    name = 'PaymentPlanAndPaymentStudy1581953663571';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `payment_plan_concept` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(300) NOT NULL, `description` varchar(255) NULL, `price` decimal(15,6) NOT NULL DEFAULT 0.000000, `satCode` varchar(255) NULL, `unitCode` varchar(255) NULL, `unity` varchar(100) NULL, `withIva` tinyint NULL DEFAULT 0, `isActive` tinyint NOT NULL DEFAULT 1, `paymentPlanId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `payment_plan` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(300) NOT NULL, `description` varchar(300) NULL, `isActiveInStudyPlan` tinyint NULL DEFAULT 0, `isActive` tinyint NULL DEFAULT 1, `studyPlanId` int NULL, `levelId` int NULL, `gradeId` int NULL, UNIQUE INDEX `REL_458d665957e2acdf7c79e30371` (`gradeId`), PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `study_plan` ADD `paymentPlansId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` ADD CONSTRAINT `FK_b985dd3be2dac2c9df732fffe19` FOREIGN KEY (`paymentPlanId`) REFERENCES `payment_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` ADD CONSTRAINT `FK_ad0f0b01cfd04efec1a1b55fde9` FOREIGN KEY (`studyPlanId`) REFERENCES `study_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` ADD CONSTRAINT `FK_b69fed8d04aafccc42b9901ca8f` FOREIGN KEY (`levelId`) REFERENCES `niveles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` ADD CONSTRAINT `FK_458d665957e2acdf7c79e30371c` FOREIGN KEY (`gradeId`) REFERENCES `grados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `study_plan` ADD CONSTRAINT `FK_3283c84f74299639e35568c5d8c` FOREIGN KEY (`paymentPlansId`) REFERENCES `payment_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `study_plan` DROP FOREIGN KEY `FK_3283c84f74299639e35568c5d8c`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` DROP FOREIGN KEY `FK_458d665957e2acdf7c79e30371c`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` DROP FOREIGN KEY `FK_b69fed8d04aafccc42b9901ca8f`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` DROP FOREIGN KEY `FK_ad0f0b01cfd04efec1a1b55fde9`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` DROP FOREIGN KEY `FK_b985dd3be2dac2c9df732fffe19`', undefined);
        await queryRunner.query('ALTER TABLE `study_plan` DROP COLUMN `paymentPlansId`', undefined);
        await queryRunner.query('DROP INDEX `REL_458d665957e2acdf7c79e30371` ON `payment_plan`', undefined);
        await queryRunner.query('DROP TABLE `payment_plan`', undefined);
        await queryRunner.query('DROP TABLE `payment_plan_concept`', undefined);
    }

}
