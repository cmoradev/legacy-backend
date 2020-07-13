import {MigrationInterface, QueryRunner} from "typeorm";

export class BranchOfficeCotizacion1594657088228 implements MigrationInterface {
    name = 'BranchOfficeCotizacion1594657088228'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `folio_cotizacion` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `serie_cotizacion` varchar(5) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `serie_cotizacion`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `folio_cotizacion`", undefined);
    }

}
