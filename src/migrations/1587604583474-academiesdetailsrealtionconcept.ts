import { MigrationInterface, QueryRunner } from 'typeorm';

export class academiesdetailsrealtionconcept1587604583474 implements MigrationInterface {
    name = 'academiesdetailsrealtionconcept1587604583474';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX `FK_1fc062f5ed9cb150ff14b5fe7f6` ON `ac_inscripciones_alumnos`', undefined);
        await queryRunner.query('DROP INDEX `FK_816a70fccf1b44fc1e3069f28b3` ON `ac_inscrip_conceptos`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` ADD `academyInscriptionConceptId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` ADD UNIQUE INDEX `IDX_6049767042b20caec88465d7e5` (`academyInscriptionConceptId`)', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD `payDay` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD `payMonth` int NULL', undefined);
        await queryRunner.query('CREATE UNIQUE INDEX `REL_6049767042b20caec88465d7e5` ON `ac_cobro_detalle` (`academyInscriptionConceptId`)', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` ADD CONSTRAINT `FK_6049767042b20caec88465d7e59` FOREIGN KEY (`academyInscriptionConceptId`) REFERENCES `ac_inscrip_conceptos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` DROP FOREIGN KEY `FK_6049767042b20caec88465d7e59`', undefined);
        await queryRunner.query('DROP INDEX `REL_6049767042b20caec88465d7e5` ON `ac_cobro_detalle`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `payMonth`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `payDay`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` DROP INDEX `IDX_6049767042b20caec88465d7e5`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` DROP COLUMN `academyInscriptionConceptId`', undefined);
        await queryRunner.query('CREATE INDEX `FK_816a70fccf1b44fc1e3069f28b3` ON `ac_inscrip_conceptos` (`id_estado_pago`)', undefined);
        await queryRunner.query('CREATE INDEX `FK_1fc062f5ed9cb150ff14b5fe7f6` ON `ac_inscripciones_alumnos` (`id_estado_inscripcion`)', undefined);
    }

}
