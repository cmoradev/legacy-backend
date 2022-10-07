import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationSaleWithTransactionEntity1665169550761 implements MigrationInterface {
    name = 'AddRelationSaleWithTransactionEntity1665169550761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transaction` ADD `saleId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_883f93bfe4051de4196ee1e500f` FOREIGN KEY (`saleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_883f93bfe4051de4196ee1e500f`");
        await queryRunner.query("ALTER TABLE `transaction` DROP COLUMN `saleId`");
    }

}
