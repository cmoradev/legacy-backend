import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedTypeOfConceptToConceptsPlan1582144903847 implements MigrationInterface {
    name = 'AddedTypeOfConceptToConceptsPlan1582144903847';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan_concept` ADD `conceptType` enum (\'OneTime\', \'MonthlyPayment\', \'Day\', \'DateAndTime\', \'Penalty\') NOT NULL DEFAULT \'OneTime\'', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan_concept` DROP COLUMN `conceptType`', undefined);
    }

}
