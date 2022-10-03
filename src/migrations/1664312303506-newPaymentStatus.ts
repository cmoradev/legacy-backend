import {MigrationInterface, QueryRunner} from "typeorm";

export class newPaymentStatus1664312303506 implements MigrationInterface {
    name = 'newPaymentStatus1664312303506'

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.query("ALTER TABLE `ac_charge_payments` CHANGE `paymentStatusId` `paymentStatusId` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_payment` CHANGE `statusPayment` `statusPayment` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_charges` CHANGE `status` `status` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_charge_payments` CHANGE `paymentStatusId` `paymentStatusId` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `systemPaymentStatusId` `systemPaymentStatusId` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6', '7') NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `systemPaymentStatusId` `systemPaymentStatusId` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_charge_payments` CHANGE `paymentStatusId` `paymentStatusId` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_charges` CHANGE `status` `status` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_payment` CHANGE `statusPayment` `statusPayment` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` CHANGE `paymentStatusId` `paymentStatusId` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'");
    }

}
