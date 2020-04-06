import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedInitialAndFinalAmountColumnsToCashRegister1586192410814 implements MigrationInterface {
    name = 'AddedInitialAndFinalAmountColumnsToCashRegister1586192410814';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `cash_register` ADD `initialAmount` decimal(15,6) NOT NULL DEFAULT \'0.000000\'', undefined);
        await queryRunner.query('ALTER TABLE `cash_register` ADD `finalAmount` decimal(15,6) NOT NULL DEFAULT \'0.000000\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT 000000000000000', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `cash_register` DROP COLUMN `finalAmount`', undefined);
        await queryRunner.query('ALTER TABLE `cash_register` DROP COLUMN `initialAmount`', undefined);
    }

}
