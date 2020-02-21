import {MigrationInterface, QueryRunner} from "typeorm";

export class addPeriodsTable1582292326029 implements MigrationInterface {
    name = 'addPeriodsTable1582292326029'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `periods` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(300) NULL, `startDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `endDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `periodsCycleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `periods` ADD CONSTRAINT `FK_2a82133d9079eaa4d87a0bad3ac` FOREIGN KEY (`periodsCycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `periods` DROP FOREIGN KEY `FK_2a82133d9079eaa4d87a0bad3ac`", undefined);
        await queryRunner.query("DROP TABLE `periods`", undefined);
    }

}
