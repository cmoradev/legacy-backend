import {MigrationInterface, QueryRunner} from "typeorm";

export class PriceListBranchOffice1591310701869 implements MigrationInterface {
    name = 'PriceListBranchOffice1591310701869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` DROP FOREIGN KEY `FK_42d15351c2083be54447d9a65c3`", undefined);
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` CHANGE `branchOfficeId` `branchOfficeIDId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_listaprecios` ADD `branchOfficeLisIdId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_listaprecios` ADD CONSTRAINT `FK_813f825e6ba5ae9c77f214b4f31` FOREIGN KEY (`branchOfficeLisIdId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` ADD CONSTRAINT `FK_9b077827d7c0d833d99939deeac` FOREIGN KEY (`branchOfficeIDId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` DROP FOREIGN KEY `FK_9b077827d7c0d833d99939deeac`", undefined);
        await queryRunner.query("ALTER TABLE `tie_listaprecios` DROP FOREIGN KEY `FK_813f825e6ba5ae9c77f214b4f31`", undefined);
        await queryRunner.query("ALTER TABLE `tie_listaprecios` DROP COLUMN `branchOfficeLisIdId`", undefined);
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` CHANGE `branchOfficeIDId` `branchOfficeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_clasificaciones` ADD CONSTRAINT `FK_42d15351c2083be54447d9a65c3` FOREIGN KEY (`branchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
