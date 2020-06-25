import {MigrationInterface, QueryRunner} from "typeorm";

export class branchOfficeMinistoreWherehouseOrder1592851045422 implements MigrationInterface {
    name = 'branchOfficeMinistoreWherehouseOrder1592851045422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` DROP FOREIGN KEY `FK_ae5a682ab034b885cb4654dec53`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` DROP FOREIGN KEY `FK_f7fd6985024a543c78efe512e2d`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD `branchOfficeMiniStoreWherehouseId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD CONSTRAINT `FK_bd3c20852880b7061274629d3a8` FOREIGN KEY (`branchOfficeMiniStoreWherehouseId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` ADD CONSTRAINT `FK_7b24867ecb2d6545bb82e301d3f` FOREIGN KEY (`inscChargeDetailId`) REFERENCES `ac_inscrip_conceptos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` ADD CONSTRAINT `FK_583a2bfb2c810353c5d5bb55fcd` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` DROP FOREIGN KEY `FK_583a2bfb2c810353c5d5bb55fcd`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` DROP FOREIGN KEY `FK_7b24867ecb2d6545bb82e301d3f`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP FOREIGN KEY `FK_bd3c20852880b7061274629d3a8`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `branchOfficeMiniStoreWherehouseId`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` ADD CONSTRAINT `FK_f7fd6985024a543c78efe512e2d` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_concepts_extra_charges` ADD CONSTRAINT `FK_ae5a682ab034b885cb4654dec53` FOREIGN KEY (`inscChargeDetailId`) REFERENCES `ac_inscrip_conceptos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
