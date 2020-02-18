import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedRelationBetweenPaymentPlanAndGrades1582041417600 implements MigrationInterface {
    name = 'ChangedRelationBetweenPaymentPlanAndGrades1582041417600';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `grados` DROP FOREIGN KEY `FK_db030c3a0325df3e92177fa7094`', undefined);
        await queryRunner.query('CREATE TABLE `payment_plan_grades_grados` (`paymentPlanId` int NOT NULL, `gradosId` int NOT NULL, INDEX `IDX_1ed17af4803ac9b19a89059e78` (`paymentPlanId`), INDEX `IDX_2567fe043a40c46f00696571d5` (`gradosId`), PRIMARY KEY (`paymentPlanId`, `gradosId`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `grados` DROP COLUMN `paymentPlanId`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_grades_grados` ADD CONSTRAINT `FK_1ed17af4803ac9b19a89059e789` FOREIGN KEY (`paymentPlanId`) REFERENCES `payment_plan`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_grades_grados` ADD CONSTRAINT `FK_2567fe043a40c46f00696571d50` FOREIGN KEY (`gradosId`) REFERENCES `grados`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan_grades_grados` DROP FOREIGN KEY `FK_2567fe043a40c46f00696571d50`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_grades_grados` DROP FOREIGN KEY `FK_1ed17af4803ac9b19a89059e789`', undefined);
        await queryRunner.query('ALTER TABLE `grados` ADD `paymentPlanId` int NULL', undefined);
        await queryRunner.query('DROP INDEX `IDX_2567fe043a40c46f00696571d5` ON `payment_plan_grades_grados`', undefined);
        await queryRunner.query('DROP INDEX `IDX_1ed17af4803ac9b19a89059e78` ON `payment_plan_grades_grados`', undefined);
        await queryRunner.query('DROP TABLE `payment_plan_grades_grados`', undefined);
        await queryRunner.query('ALTER TABLE `grados` ADD CONSTRAINT `FK_db030c3a0325df3e92177fa7094` FOREIGN KEY (`paymentPlanId`) REFERENCES `payment_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

}
