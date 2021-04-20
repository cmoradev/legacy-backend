import {MigrationInterface, QueryRunner} from "typeorm";

export class IdFamilyAndIdCampusRemovedFromStudents1618421113051 implements MigrationInterface {
    name = 'IdFamilyAndIdCampusRemovedFromStudents1618421113051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumnos` DROP COLUMN `id_familia`");
        await queryRunner.query("ALTER TABLE `alumnos` DROP COLUMN `id_plantel`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumnos` ADD `id_plantel` int NOT NULL");
        await queryRunner.query("ALTER TABLE `alumnos` ADD `id_familia` int NOT NULL");
    }

}
