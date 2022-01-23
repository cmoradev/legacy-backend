import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnQuoteNameInVentas1641585990831 implements MigrationInterface {
    name = 'addColumnQuoteNameInVentas1641585990831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD `quoteName` varchar(100) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP COLUMN `quoteName`");
    }

}
