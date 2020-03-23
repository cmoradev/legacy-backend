import {MigrationInterface, QueryRunner} from "typeorm";

export class add1584992308971 implements MigrationInterface {
    name = 'add1584992308971'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `tie_products-of-providers` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `supplierPrice` decimal(15,6) NULL DEFAULT 0.000000, `productId` int NULL, `providerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `tie_products-of-providers` ADD CONSTRAINT `FK_c943c6bc7e0849f40271c0fb703` FOREIGN KEY (`productId`) REFERENCES `tie_productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_products-of-providers` ADD CONSTRAINT `FK_95e366b83ca53a1fce572a0159b` FOREIGN KEY (`providerId`) REFERENCES `tie_almacen_proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_products-of-providers` DROP FOREIGN KEY `FK_95e366b83ca53a1fce572a0159b`", undefined);
        await queryRunner.query("ALTER TABLE `tie_products-of-providers` DROP FOREIGN KEY `FK_c943c6bc7e0849f40271c0fb703`", undefined);
        await queryRunner.query("DROP TABLE `tie_products-of-providers`", undefined);
    }

}
