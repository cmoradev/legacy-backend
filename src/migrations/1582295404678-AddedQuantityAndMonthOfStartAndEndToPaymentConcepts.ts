import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedQuantityAndMonthOfStartAndEndToPaymentConcepts1582295404678 implements MigrationInterface {
    name = 'AddedQuantityAndMonthOfStartAndEndToPaymentConcepts1582295404678';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan_concept` ADD `quantity` int NOT NULL DEFAULT 1', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` ADD `startMonth` enum (\'January\', \'February\', \'March\', \'April\', \'May\',\'June\', \'July\', \'August\', \'September\', \'October\', \'November\', \'December\') NULL', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` ADD `endMonth` enum (\'January\', \'February\', \'March\', \'April\', \'May\',\'June\', \'July\', \'August\', \'September\', \'October\', \'November\', \'December\') NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan_concept` DROP COLUMN `endMonth`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` DROP COLUMN `startMonth`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` DROP COLUMN `quantity`', undefined);
    }

}
