import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEntityIdentifier1671052279036 implements MigrationInterface {
    name = 'AddEntityIdentifier1671052279036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `identifier` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `version` int NOT NULL DEFAULT '0', `uuid` varchar(36) NOT NULL, `identifier` varchar(255) NOT NULL, `type` enum ('0') NOT NULL, `studentId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `identifier` ADD CONSTRAINT `FK_4e5f11c011be1341beec7ae14c3` FOREIGN KEY (`studentId`) REFERENCES `alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `identifier` DROP FOREIGN KEY `FK_4e5f11c011be1341beec7ae14c3`");
        await queryRunner.query("DROP TABLE `identifier`");
    }

}
