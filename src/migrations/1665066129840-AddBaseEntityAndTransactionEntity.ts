import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBaseEntityAndTransactionEntity1665066129840 implements MigrationInterface {
    name = 'AddBaseEntityAndTransactionEntity1665066129840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `version` int NOT NULL DEFAULT '0', `uuid` varchar(36) NOT NULL, `type` enum ('0', '1') NOT NULL, `preBalance` int NOT NULL, `quantity` int NOT NULL, `balance` int NOT NULL, `studentId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD `version` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD `version` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD `version` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `alumnos` ADD `saldo` int NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `domicilioFiscalReceptor` `domicilioFiscalReceptor` varchar(5) NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `regimenFiscalReceptor` `regimenFiscalReceptor` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `keyRegimen` `keyRegimen` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_3e2a82e1e69f6e979bec0c3a6d6` FOREIGN KEY (`studentId`) REFERENCES `alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_3e2a82e1e69f6e979bec0c3a6d6`");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `keyRegimen` `keyRegimen` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `regimenFiscalReceptor` `regimenFiscalReceptor` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` CHANGE `domicilioFiscalReceptor` `domicilioFiscalReceptor` varchar(5) NULL");
        await queryRunner.query("ALTER TABLE `alumnos` DROP COLUMN `saldo`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP COLUMN `version`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP COLUMN `version`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP COLUMN `version`");
        await queryRunner.query("DROP TABLE `transaction`");
    }

}
