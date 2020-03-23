import {MigrationInterface, QueryRunner} from "typeorm";

export class changeWareHouseProvider1584989354916 implements MigrationInterface {
    name = 'changeWareHouseProvider1584989354916'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` DROP COLUMN `id_ciudad`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` DROP COLUMN `id_estado`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` DROP COLUMN `id_pais`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` ADD `country` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` ADD `stado` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` ADD `city` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` DROP COLUMN `city`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` DROP COLUMN `stado`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` DROP COLUMN `country`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` ADD `id_pais` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` ADD `id_estado` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_proveedores` ADD `id_ciudad` int NULL", undefined);
    }

}
