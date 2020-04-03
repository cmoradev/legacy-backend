import {MigrationInterface, QueryRunner} from "typeorm";

export class changenametable1585923174775 implements MigrationInterface {
    name = 'changenametable1585923174775'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_products_of_providers` ADD CONSTRAINT `FK_c58045f24a2f7d5d73405005551` FOREIGN KEY (`productId`) REFERENCES `tie_productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_products_of_providers` ADD CONSTRAINT `FK_78ca4e77741d7f6e8b49deb7eae` FOREIGN KEY (`providerId`) REFERENCES `tie_almacen_proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_products_of_providers` DROP FOREIGN KEY `FK_78ca4e77741d7f6e8b49deb7eae`", undefined);
        await queryRunner.query("ALTER TABLE `tie_products_of_providers` DROP FOREIGN KEY `FK_c58045f24a2f7d5d73405005551`", undefined);
    }

}
