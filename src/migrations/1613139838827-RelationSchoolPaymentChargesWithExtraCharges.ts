import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationSchoolPaymentChargesWithExtraCharges1613139838827 implements MigrationInterface {
    name = 'RelationSchoolPaymentChargesWithExtraCharges1613139838827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` DROP FOREIGN KEY `FK_3f25a4de354c6d3856090a5aff6`");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` DROP FOREIGN KEY `FK_c0d9051ccdbec46518244a3743f`");
        await queryRunner.query("ALTER TABLE `school_charges_details` DROP FOREIGN KEY `FK_2f4505954cf3b2ea865c30e03ea`");
        await queryRunner.query("ALTER TABLE `school_charges_details` DROP FOREIGN KEY `FK_42f725a32538bf2a1aa55a1d8bb`");
        await queryRunner.query("DROP INDEX `FK_9a4c2f5554c6cdad5fb1699ca72` ON `school_payment_charge`");
        await queryRunner.query("DROP INDEX `FK_6eceb8094d92f3242ccaccf4259` ON `school_payment_charge`");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` ADD CONSTRAINT `FK_f867741716e757d8623964b23cc` FOREIGN KEY (`miniSaleChargeDetailsId`) REFERENCES `tie_venta_detalle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` ADD CONSTRAINT `FK_62f0a8544718402cc9aaaf02c40` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_details` ADD CONSTRAINT `FK_38fb154cccc3812e90710d7e9d7` FOREIGN KEY (`schoolChargeId`) REFERENCES `school_charges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_details` ADD CONSTRAINT `FK_d9925bd2a0d79a2478ac3296213` FOREIGN KEY (`schoolPlanPaymentId`) REFERENCES `school_payment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_payment_charge` ADD CONSTRAINT `FK_9a4c2f5554c6cdad5fb1699ca72` FOREIGN KEY (`schoolPaymentChargeDetailId`) REFERENCES `school_payment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_payment_charge` ADD CONSTRAINT `FK_6eceb8094d92f3242ccaccf4259` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_payment_charge` DROP FOREIGN KEY `FK_6eceb8094d92f3242ccaccf4259`");
        await queryRunner.query("ALTER TABLE `school_payment_charge` DROP FOREIGN KEY `FK_9a4c2f5554c6cdad5fb1699ca72`");
        await queryRunner.query("ALTER TABLE `school_charges_details` DROP FOREIGN KEY `FK_d9925bd2a0d79a2478ac3296213`");
        await queryRunner.query("ALTER TABLE `school_charges_details` DROP FOREIGN KEY `FK_38fb154cccc3812e90710d7e9d7`");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` DROP FOREIGN KEY `FK_62f0a8544718402cc9aaaf02c40`");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` DROP FOREIGN KEY `FK_f867741716e757d8623964b23cc`");
        await queryRunner.query("CREATE INDEX `FK_6eceb8094d92f3242ccaccf4259` ON `school_payment_charge` (`systemExtraChargesId`)");
        await queryRunner.query("CREATE INDEX `FK_9a4c2f5554c6cdad5fb1699ca72` ON `school_payment_charge` (`schoolPaymentChargeDetailId`)");
        await queryRunner.query("ALTER TABLE `school_charges_details` ADD CONSTRAINT `FK_42f725a32538bf2a1aa55a1d8bb` FOREIGN KEY (`schoolPlanPaymentId`) REFERENCES `school_payment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_details` ADD CONSTRAINT `FK_2f4505954cf3b2ea865c30e03ea` FOREIGN KEY (`schoolChargeId`) REFERENCES `school_charges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` ADD CONSTRAINT `FK_c0d9051ccdbec46518244a3743f` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `mini_store_details_extra_charges` ADD CONSTRAINT `FK_3f25a4de354c6d3856090a5aff6` FOREIGN KEY (`miniSaleChargeDetailsId`) REFERENCES `tie_venta_detalle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
