import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationAcademyInscriptionWithSchoolLevelGradeGroup1591655675856 implements MigrationInterface {
    name = 'addRelationAcademyInscriptionWithSchoolLevelGradeGroup1591655675856';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` ADD `version` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` ADD `uuid` varchar(36) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_nivel` `id_nivel` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_grado` `id_grado` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_grupo` `id_grupo` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_86e289037ba621a4839d9f4fe81` FOREIGN KEY (`id_nivel`) REFERENCES `niveles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_d7aa41d506c5869ebb96f241d62` FOREIGN KEY (`id_grado`) REFERENCES `grados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_90ab5405d8f59252c9687e0e0ae` FOREIGN KEY (`id_grupo`) REFERENCES `grupos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_90ab5405d8f59252c9687e0e0ae`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_d7aa41d506c5869ebb96f241d62`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_86e289037ba621a4839d9f4fe81`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_grupo` `id_grupo` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_grado` `id_grado` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_nivel` `id_nivel` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` DROP COLUMN `version`', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `updatedAt` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscripciones_alumnos` CHANGE `createdAt` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    }

}
