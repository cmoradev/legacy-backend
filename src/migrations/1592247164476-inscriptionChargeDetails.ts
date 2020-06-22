import {MigrationInterface, QueryRunner} from "typeorm";

export class inscriptionChargeDetails1592247164476 implements MigrationInterface {
    name = 'inscriptionChargeDetails1592247164476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `ac_inscrip_concepts_extra_charges` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `applicationType` enum ('1', '2') NULL, `operationType` enum ('sum', 'subtraction', 'division', 'multiplication') NULL, `typeExtraCharge` enum ('1', '2', '3') NULL, `inscChargeDetailId` int NULL, `systemExtraChargesId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_5559a04aad9b9940a75929e9843`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_concepto_cobro` `id_concepto_cobro` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` ADD CONSTRAINT `FK_ae5a682ab034b885cb4654dec53` FOREIGN KEY (`inscChargeDetailId`) REFERENCES `ac_inscrip_conceptos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` ADD CONSTRAINT `FK_f7fd6985024a543c78efe512e2d` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_5559a04aad9b9940a75929e9843` FOREIGN KEY (`id_concepto_cobro`) REFERENCES `ac_conceptos_cobro`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_5559a04aad9b9940a75929e9843`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` DROP FOREIGN KEY `FK_f7fd6985024a543c78efe512e2d`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` DROP FOREIGN KEY `FK_ae5a682ab034b885cb4654dec53`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_concepto_cobro` `id_concepto_cobro` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_5559a04aad9b9940a75929e9843` FOREIGN KEY (`id_concepto_cobro`) REFERENCES `ac_conceptos_cobro`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("DROP TABLE `ac_inscrip_concepts_extra_charges`", undefined);
    }

}
