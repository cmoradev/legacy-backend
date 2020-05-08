import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIvaDesatils1588967898046 implements MigrationInterface {
    name = 'addIvaDesatils1588967898046';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` ADD `isIva` tinyint NOT NULL DEFAULT 1', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` DROP COLUMN `isIva`', undefined);
    }

}
