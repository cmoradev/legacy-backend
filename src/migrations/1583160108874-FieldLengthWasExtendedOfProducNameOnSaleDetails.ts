import { MigrationInterface, QueryRunner } from 'typeorm';

export class FieldLengthWasExtendedOfProducNameOnSaleDetails1583160108874 implements MigrationInterface {
    name = 'FieldLengthWasExtendedOfProducNameOnSaleDetails1583160108874';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE COLUMN `product_name` `product_name` varchar(255) NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE COLUMN `product_name` `product_name` varchar(8) NULL', undefined);
    }

}
