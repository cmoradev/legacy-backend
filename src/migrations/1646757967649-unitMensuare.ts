import {MigrationInterface, QueryRunner} from "typeorm";

export class unitMensuare1646757967649 implements MigrationInterface {
    name = 'unitMensuare1646757967649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `unidad` `unidad` varchar(20) NOT NULL DEFAULT 'Pz'");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `unitMeasurement` varchar(255) NOT NULL DEFAULT 'H87'");
        await queryRunner.query("UPDATE `tie_productos` SET `unidad` = 'Pz'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `unitMeasurement`");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `unitMeasurement` int NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `unidad` `unidad` varchar(20) NOT NULL DEFAULT 'Pieza'");
    }

}
