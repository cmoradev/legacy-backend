import { MigrationInterface, QueryRunner } from 'typeorm';

export class academieschangepropertis1587569874722 implements MigrationInterface {
    name = 'academieschangepropertis1587569874722';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_1fc062f5ed9cb150ff14b5fe7f6`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_816a70fccf1b44fc1e3069f28b3`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `is_isr`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `is_ivaretencion`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE  `id_estado_inscripcion` `id_estado_inscripcion` enum (\'1\', \'2\', \'3\') NOT NULL DEFAULT \'1\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_estado_pago` `id_estado_pago` enum (\'1\', \'2\', \'3\', \'4\', \'5\', \'6\') NOT NULL DEFAULT \'1\'', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_estado_pago` `id_estado_pago` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_estado_inscripcion` `id_estado_inscripcion` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD `is_ivaretencion` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD `is_isr` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_816a70fccf1b44fc1e3069f28b3` FOREIGN KEY (`id_estado_pago`) REFERENCES `estado_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_1fc062f5ed9cb150ff14b5fe7f6` FOREIGN KEY (`id_estado_inscripcion`) REFERENCES `ac_inscrip_estados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

}
