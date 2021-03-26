import {MigrationInterface, QueryRunner} from "typeorm";

export class StatusStudentInscription1616769068777 implements MigrationInterface {
    name = 'StatusStudentInscription1616769068777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumnos` ADD `statusStudentInscription` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumnos` DROP COLUMN `statusStudentInscription`");
    }

}
