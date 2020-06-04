import {MigrationInterface, QueryRunner} from "typeorm";

export class ClasificationBranchOffice1591284679077 implements MigrationInterface {
    name = 'ClasificationBranchOffice1591284679077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` ADD `branchOfficeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` ADD CONSTRAINT `FK_42d15351c2083be54447d9a65c3` FOREIGN KEY (`branchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` DROP FOREIGN KEY `FK_42d15351c2083be54447d9a65c3`", undefined);
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` DROP COLUMN `branchOfficeId`", undefined);
    }

}
