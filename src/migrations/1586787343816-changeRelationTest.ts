import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationTest1586787343816 implements MigrationInterface {
    name = 'changeRelationTest1586787343816'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school-charges-details-extra-charges` DROP FOREIGN KEY `FK_3a3a444ce31b2872a8d999c4027`", undefined);
        await queryRunner.query("ALTER TABLE `school-charges-details-extra-charges` CHANGE `schoolChargeDetailsId` `chargeDetailId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT 000000000000000", undefined);
        await queryRunner.query("ALTER TABLE `school-charges-details-extra-charges` ADD CONSTRAINT `FK_9e28383774755b2e54d59048cdb` FOREIGN KEY (`chargeDetailId`) REFERENCES `school_charge_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school-charges-details-extra-charges` DROP FOREIGN KEY `FK_9e28383774755b2e54d59048cdb`", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `school-charges-details-extra-charges` CHANGE `chargeDetailId` `schoolChargeDetailsId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school-charges-details-extra-charges` ADD CONSTRAINT `FK_3a3a444ce31b2872a8d999c4027` FOREIGN KEY (`schoolChargeDetailsId`) REFERENCES `school_charges_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
