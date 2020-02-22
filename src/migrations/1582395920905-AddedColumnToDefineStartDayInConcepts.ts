import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedColumnToDefineStartDayInConcepts1582395920905 implements MigrationInterface {
    name = 'AddedColumnToDefineStartDayInConcepts1582395920905';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `school_charge_details` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `codeConcept` varchar(255) NOT NULL, `codeUnit` varchar(255) NULL, `unidad` varchar(255) NULL, `concept` varchar(255) NOT NULL, `quantity` int NOT NULL, `price` decimal(15,6) NOT NULL DEFAULT 0.000000, `schoolChargeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` ADD `startDay` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_details` ADD CONSTRAINT `FK_2f4505954cf3b2ea865c30e03ea` FOREIGN KEY (`schoolChargeId`) REFERENCES `school_charges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `school_charge_details` DROP FOREIGN KEY `FK_2f4505954cf3b2ea865c30e03ea`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept` DROP COLUMN `startDay`', undefined);
        await queryRunner.query('DROP TABLE `school_charge_details`', undefined);
    }

}
