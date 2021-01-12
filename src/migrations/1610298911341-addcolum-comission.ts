import { MigrationInterface, QueryRunner } from 'typeorm';

export class addcolumComission1610298911341 implements MigrationInterface {
    name = 'addcolumComission1610298911341';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `per_commissions` decimal(15,2) NULL DEFAULT \'0.00\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `per_commissions`');
    }

}
