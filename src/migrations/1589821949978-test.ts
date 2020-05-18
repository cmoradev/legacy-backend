import {MigrationInterface, QueryRunner} from "typeorm";

export class test1589821949978 implements MigrationInterface {
    name = 'test1589821949978'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_0cb46f1027849829a0a3d77383c`", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_4e71c0dde452c577095320c1b03`", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_194bc0a443b90674c7d6ee013b7` FOREIGN KEY (`storeBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_1aa21d5c3c9d7a32adfa2ce1611` FOREIGN KEY (`cycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_1aa21d5c3c9d7a32adfa2ce1611`", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_194bc0a443b90674c7d6ee013b7`", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_4e71c0dde452c577095320c1b03` FOREIGN KEY (`storeBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_0cb46f1027849829a0a3d77383c` FOREIGN KEY (`cycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
