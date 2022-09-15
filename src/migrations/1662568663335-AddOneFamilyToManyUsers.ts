import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOneFamilyToManyUsers1662568663335 implements MigrationInterface {
    name = 'AddOneFamilyToManyUsers1662568663335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` ADD `familyId` int NULL");
        await queryRunner.query("ALTER TABLE `usuarios` ADD CONSTRAINT `FK_ecfe99eba70d286a374542c9ebe` FOREIGN KEY (`familyId`) REFERENCES `familias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuarios` DROP FOREIGN KEY `FK_ecfe99eba70d286a374542c9ebe`");
        await queryRunner.query("ALTER TABLE `usuarios` DROP COLUMN `familyId`");
    }

}
