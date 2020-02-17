import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedRelationtypeToGradeWithPaymentPlans1581970570441 implements MigrationInterface {
    name = 'ChangedRelationtypeToGradeWithPaymentPlans1581970570441';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `grados` ADD `paymentPlanId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `grados` ADD CONSTRAINT `FK_db030c3a0325df3e92177fa7094` FOREIGN KEY (`paymentPlanId`) REFERENCES `payment_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `grados` DROP FOREIGN KEY `FK_db030c3a0325df3e92177fa7094`', undefined);
        await queryRunner.query('ALTER TABLE `grados` DROP COLUMN `paymentPlanId`', undefined);
    }

}
