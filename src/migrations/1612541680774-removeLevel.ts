import {MigrationInterface, QueryRunner} from "typeorm";

export class removeLevel1612541680774 implements MigrationInterface {
    name = 'removeLevel1612541680774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `grados` DROP COLUMN `id_nivel`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `grados` ADD `id_nivel` int NOT NULL");
    }

}
