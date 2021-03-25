import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusInscriptionColumn1616686166767 implements MigrationInterface {
    name = 'AddStatusInscriptionColumn1616686166767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `inscripciones` ADD `statusInscription` enum ('1', '2', '3') NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `inscripciones` DROP COLUMN `statusInscription`");
    }

}
