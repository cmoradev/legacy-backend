import {MigrationInterface, QueryRunner} from "typeorm";

export class PaymentPlanExtraCharges1609957778841 implements MigrationInterface {
    name = 'PaymentPlanExtraCharges1609957778841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `payment_plan_concept_charges` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `applicationType` enum ('1', '2') NULL, `operationType` enum ('sum', 'subtraction', 'division', 'multiplication') NULL, `typeExtraCharge` enum ('1', '2', '3') NULL, `paymentPlanChargeDetailId` int NULL, `systemExtraChargesId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `payment_plan_concept_charges` ADD CONSTRAINT `FK_9e31f6534d4f8cf87c67cf594a6` FOREIGN KEY (`paymentPlanChargeDetailId`) REFERENCES `payment_plan_concept`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `payment_plan_concept_charges` ADD CONSTRAINT `FK_88ff8cfd6c213b59f8518036291` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `payment_plan_concept_charges` DROP FOREIGN KEY `FK_88ff8cfd6c213b59f8518036291`");
        await queryRunner.query("ALTER TABLE `payment_plan_concept_charges` DROP FOREIGN KEY `FK_9e31f6534d4f8cf87c67cf594a6`");
        await queryRunner.query("DROP TABLE `payment_plan_concept_charges`");
    }

}
