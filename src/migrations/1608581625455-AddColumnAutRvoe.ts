import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnAutRvoe1608581625455 implements MigrationInterface {
    name = 'AddColumnAutRvoe1608581625455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `aut_rvoe` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `levelId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `aut_rvoe` ADD CONSTRAINT `FK_2310b2ca346d1aa5ca115eaacb1` FOREIGN KEY (`levelId`) REFERENCES `niveles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `aut_rvoe` DROP FOREIGN KEY `FK_2310b2ca346d1aa5ca115eaacb1`");
        await queryRunner.query("DROP TABLE `aut_rvoe`");
    }

}
