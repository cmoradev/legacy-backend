import { MigrationInterface, QueryRunner } from 'typeorm';

export class extrachargeschool1582125284141 implements MigrationInterface {
    name = 'extrachargeschool1582125284141';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `school-charges-details-extra-charges` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `applicationType` enum (\'1\', \'2\') NULL, `operationType` enum (\'sum\', \'subtraction\', \'division\', \'multiplication\') NULL, `typeExtraCharge` enum (\'1\', \'2\', \'3\') NULL, `schoolChargeDetailsId` int NULL, `systemExtraChargesId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` CHANGE `folio` `folio` varchar(45) NOT NULL DEFAULT 000000000000000', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-details-extra-charges` ADD CONSTRAINT `FK_3a3a444ce31b2872a8d999c4027` FOREIGN KEY (`schoolChargeDetailsId`) REFERENCES `school_charges_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-details-extra-charges` ADD CONSTRAINT `FK_5c415253d5e7f7e032510b789af` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `school-charges-details-extra-charges` DROP FOREIGN KEY `FK_5c415253d5e7f7e032510b789af`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-details-extra-charges` DROP FOREIGN KEY `FK_3a3a444ce31b2872a8d999c4027`', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` CHANGE `folio` `folio` varchar(45) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('DROP TABLE `school-charges-details-extra-charges`', undefined);
    }

}
