import {MigrationInterface, QueryRunner} from "typeorm";

export class DeletePaymentPlanConceptsChargesAndAddSchoolPaymentCharges1610343060868 implements MigrationInterface {
    name = 'DeletePaymentPlanConceptsChargesAndAddSchoolPaymentCharges1610343060868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `school_payment_charge` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `applicationType` enum ('1', '2') NULL, `operationType` enum ('sum', 'subtraction', 'division', 'multiplication') NULL, `typeExtraCharge` enum ('1', '2', '3') NULL, `schoolPaymentChargeDetailId` int NULL, `systemExtraChargesId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `school_payment_charge` ADD CONSTRAINT `FK_9a4c2f5554c6cdad5fb1699ca72` FOREIGN KEY (`schoolPaymentChargeDetailId`) REFERENCES `school_payment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_payment_charge` ADD CONSTRAINT `FK_6eceb8094d92f3242ccaccf4259` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_payment_charge` DROP FOREIGN KEY `FK_6eceb8094d92f3242ccaccf4259`");
        await queryRunner.query("ALTER TABLE `school_payment_charge` DROP FOREIGN KEY `FK_9a4c2f5554c6cdad5fb1699ca72`");
        await queryRunner.query("DROP TABLE `school_payment_charge`");
    }

}
