import {MigrationInterface, QueryRunner} from "typeorm";

export class ordenalmacentimestamp1585261444794 implements MigrationInterface {
    name = 'ordenalmacentimestamp1585261444794'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `fecha_pedido` `fecha_pedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `fecha_prevista` `fecha_prevista` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `fecha_prevista`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD `fecha_prevista` date NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `fecha_pedido`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD `fecha_pedido` date NULL", undefined);
    }

}
