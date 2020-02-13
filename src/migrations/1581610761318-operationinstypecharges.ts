import { MigrationInterface, QueryRunner } from 'typeorm';

export class operationinstypecharges1581610761318 implements MigrationInterface {
    name = 'operationinstypecharges1581610761318';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_tipo_descuento` ADD `operations` varchar(100) NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_tipo_descuento` DROP COLUMN `operations`', undefined);
    }

}
