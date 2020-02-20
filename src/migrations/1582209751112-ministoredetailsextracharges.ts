import {MigrationInterface, QueryRunner} from "typeorm";

export class ministoredetailsextracharges1582209751112 implements MigrationInterface {
    name = 'ministoredetailsextracharges1582209751112'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `mini-store-details-extra-charges` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `applicationType` enum ('1', '2') NULL, `operationType` enum ('sum', 'subtraction', 'division', 'multiplication') NULL, `typeExtraCharge` enum ('1', '2', '3') NULL, `miniSaleChargeDetailsId` int NULL, `systemExtraChargesId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `mini-store-details-extra-charges` ADD CONSTRAINT `FK_3f25a4de354c6d3856090a5aff6` FOREIGN KEY (`miniSaleChargeDetailsId`) REFERENCES `tie_venta_detalle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `mini-store-details-extra-charges` ADD CONSTRAINT `FK_c0d9051ccdbec46518244a3743f` FOREIGN KEY (`systemExtraChargesId`) REFERENCES `ac_descuentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `mini-store-details-extra-charges` DROP FOREIGN KEY `FK_c0d9051ccdbec46518244a3743f`", undefined);
        await queryRunner.query("ALTER TABLE `mini-store-details-extra-charges` DROP FOREIGN KEY `FK_3f25a4de354c6d3856090a5aff6`", undefined);
        await queryRunner.query("DROP TABLE `mini-store-details-extra-charges`", undefined);
    }

}
