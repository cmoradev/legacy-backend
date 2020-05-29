import {MigrationInterface, QueryRunner} from "typeorm";

export class branchOfficeProducts1590624280673 implements MigrationInterface {
    name = 'branchOfficeProducts1590624280673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `branchOfficeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_productos` ADD CONSTRAINT `FK_836905633753515d80727e96851` FOREIGN KEY (`branchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` DROP FOREIGN KEY `FK_836905633753515d80727e96851`", undefined);
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `branchOfficeId`", undefined);
    }

}
