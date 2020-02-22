import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolPaymentsChangeProperty1582301656411 implements MigrationInterface {
    name = 'SchoolPaymentsChangeProperty1582301656411'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` DROP FOREIGN KEY `FK_7c290d55bb64314f8e75eba0f01`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` CHANGE `inscriptionsId` `inscriptionId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD CONSTRAINT `FK_e26dcb4be4957bbbe59aff36638` FOREIGN KEY (`inscriptionId`) REFERENCES `inscripciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` DROP FOREIGN KEY `FK_e26dcb4be4957bbbe59aff36638`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` CHANGE `inscriptionId` `inscriptionsId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD CONSTRAINT `FK_7c290d55bb64314f8e75eba0f01` FOREIGN KEY (`inscriptionsId`) REFERENCES `inscripciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
