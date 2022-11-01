import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteRelationSaleReturnWithTieFacturas1667321487800 implements MigrationInterface {
    name = 'deleteRelationSaleReturnWithTieFacturas1667321487800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP FOREIGN KEY `FK_921d35ac5cb5c7acd9efbf3ac99`");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `saleReturnId`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `saleReturnId` int NULL");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD CONSTRAINT `FK_921d35ac5cb5c7acd9efbf3ac99` FOREIGN KEY (`saleReturnId`) REFERENCES `sale_returns`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
