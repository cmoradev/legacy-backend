import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableCotizacion1609350110041 implements MigrationInterface {
    name = 'addTableCotizacion1609350110041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `mini_store_quotation` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `saleId` int NULL, `quotationId` int NULL, UNIQUE INDEX `REL_363edebffbcdd5e9ba52d9c88c` (`saleId`), UNIQUE INDEX `REL_fb9abb53d607444442e70be845` (`quotationId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `mini_store_quotation` ADD CONSTRAINT `FK_363edebffbcdd5e9ba52d9c88c4` FOREIGN KEY (`saleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `mini_store_quotation` ADD CONSTRAINT `FK_fb9abb53d607444442e70be845d` FOREIGN KEY (`quotationId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `mini_store_quotation` DROP FOREIGN KEY `FK_fb9abb53d607444442e70be845d`");
        await queryRunner.query("ALTER TABLE `mini_store_quotation` DROP FOREIGN KEY `FK_363edebffbcdd5e9ba52d9c88c4`");
        await queryRunner.query("DROP INDEX `REL_fb9abb53d607444442e70be845` ON `mini_store_quotation`");
        await queryRunner.query("DROP INDEX `REL_363edebffbcdd5e9ba52d9c88c` ON `mini_store_quotation`");
        await queryRunner.query("DROP TABLE `mini_store_quotation`");
    }

}
