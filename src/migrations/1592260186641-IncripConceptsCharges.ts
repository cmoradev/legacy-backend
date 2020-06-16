import {MigrationInterface, QueryRunner} from "typeorm";

export class IncripConceptsCharges1592260186641 implements MigrationInterface {
    name = 'IncripConceptsCharges1592260186641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_charges_details_extra_charges` DROP FOREIGN KEY `FK_ae5a682ab034b885cb4654dec53`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_charges_details_extra_charges` ADD CONSTRAINT `FK_ae5a682ab034b885cb4654dec53` FOREIGN KEY (`inscChargeDetailId`) REFERENCES `ac_inscrip_conceptos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_charges_details_extra_charges` DROP FOREIGN KEY `FK_ae5a682ab034b885cb4654dec53`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_charges_details_extra_charges` ADD CONSTRAINT `FK_ae5a682ab034b885cb4654dec53` FOREIGN KEY (`inscChargeDetailId`) REFERENCES `ac_inscripciones_alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
