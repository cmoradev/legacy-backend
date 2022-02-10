import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsBusinessNameFamily1644532278732 implements MigrationInterface {
    name = 'addColumnsBusinessNameFamily1644532278732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `familia_infofiscal` DROP COLUMN `id_regimen`")
        await queryRunner.query("ALTER TABLE `familia_infofiscal` ADD `domicilioFiscalReceptor` varchar(5) NOT NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` ADD `regimenFiscalReceptor` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` ADD `keyRegimen` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `familia_infofiscal` ADD `id_regimen` int NULL");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` DROP COLUMN `regimenFiscalReceptor`");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` DROP COLUMN `domicilioFiscalReceptor`");
        await queryRunner.query("ALTER TABLE `familia_infofiscal` DROP COLUMN `keyRegimen`");
    }

}
