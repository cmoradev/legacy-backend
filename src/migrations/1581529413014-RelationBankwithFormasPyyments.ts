import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationBankwithFormasPyyments1581529413014 implements MigrationInterface {
    name = 'RelationBankwithFormasPyyments1581529413014'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `id_banco` `id_banco` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` ADD CONSTRAINT `FK_63d8464ea226762d9f520b32527` FOREIGN KEY (`id_banco`) REFERENCES `facturacion_bancos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` DROP FOREIGN KEY `FK_63d8464ea226762d9f520b32527`", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float(12) NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `id_banco` `id_banco` int NOT NULL DEFAULT '0'", undefined);
    }

}
