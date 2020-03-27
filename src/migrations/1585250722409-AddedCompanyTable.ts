import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCompanyTable1585250722409 implements MigrationInterface {
    name = 'AddedCompanyTable1585250722409';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `company` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL DEFAULT \'\', `businessName` varchar(255) NOT NULL DEFAULT \'\', `rfc` varchar(255) NOT NULL DEFAULT \'\', `address` varchar(255) NOT NULL DEFAULT \'\', `uuid` varchar(36) NOT NULL, `version` int NOT NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `defaultClientId` int NULL, UNIQUE INDEX `REL_44ba695b97d0e4e53d851ef721` (`defaultClientId`), PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `company` ADD CONSTRAINT `FK_44ba695b97d0e4e53d851ef7213` FOREIGN KEY (`defaultClientId`) REFERENCES `alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `company` DROP FOREIGN KEY `FK_44ba695b97d0e4e53d851ef7213`', undefined);
        await queryRunner.query('DROP INDEX `REL_44ba695b97d0e4e53d851ef721` ON `company`', undefined);
        await queryRunner.query('DROP TABLE `company`', undefined);
    }

}
