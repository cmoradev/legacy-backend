import {MigrationInterface, QueryRunner} from "typeorm";

export class removeidlaravel1596562472584 implements MigrationInterface {
    name = 'removeidlaravel1596562472584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `id_listaprecios`");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `id_clasificacion`");
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `id_facturacion_codigos`");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `id_producto`");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `id_clasificacion`");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `id_tie_venta`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `id_tie_venta` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `id_clasificacion` int NOT NULL");
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `id_producto` int NOT NULL");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `id_facturacion_codigos` int NOT NULL");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `id_clasificacion` int NOT NULL");
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `id_listaprecios` int NOT NULL DEFAULT '0'");
    }

}
