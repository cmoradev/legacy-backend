import {MigrationInterface, QueryRunner} from "typeorm";

export class invoiceDeleteStatus1589416636846 implements MigrationInterface {
    name = 'invoiceDeleteStatus1589416636846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `active` tinyint(1) NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `active`", undefined);
    }

}
