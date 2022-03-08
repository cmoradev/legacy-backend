import {MigrationInterface, QueryRunner} from "typeorm";

export class addFiscalColumn1646761311003 implements MigrationInterface {
    name = 'addFiscalColumn1646761311003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `objetoImp` varchar(2) NOT NULL DEFAULT '02'");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `unidad` `unidad` varchar(20) NOT NULL DEFAULT 'Pz'");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'H87'");
        await queryRunner.query("UPDATE `tie_productos` SET `unidad` = 'Pz'")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `unitMeasurement` int NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `unidad` `unidad` varchar(20) NOT NULL DEFAULT 'Pieza'");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `objetoImp`");
    }

}
