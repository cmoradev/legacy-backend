import {MigrationInterface, QueryRunner} from "typeorm";

export class DropsTables1612792380975 implements MigrationInterface {
    name = 'DropsTables1612792380975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `id_alumnos`");
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `id_plantel`");
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `id_ciclos`");
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `id_nivel`");
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `id_grados`");
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `id_grupos`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `id_grupos` int NOT NULL");
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `id_grados` int NOT NULL");
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `id_nivel` int NOT NULL");
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `id_ciclos` int NOT NULL");
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `id_plantel` int NOT NULL");
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `id_alumnos` int NOT NULL");
    }

}
