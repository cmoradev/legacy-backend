import { MigrationInterface, QueryRunner } from 'typeorm';

export class changetypefoliocontizacion1594735713744 implements MigrationInterface {
    name = 'changetypefoliocontizacion1594735713744';

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query("ALTER TABLE `tie_facturas` DROP FOREIGN KEY `FK_b4767e0f07c997d12c53911a3a8`", undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE `folio_cotizacion` `folio_cotizacion` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE `serie_cotizacion` `serie_cotizacion` int NULL', undefined);
        // await queryRunner.query("ALTER TABLE `tie_facturas` ADD CONSTRAINT `FK_74b813d87442605a06499f94235` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query("ALTER TABLE `tie_facturas` DROP FOREIGN KEY `FK_74b813d87442605a06499f94235`", undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE  `serie_cotizacion` `serie_cotizacion` varchar(5) CHARACTER SET "utf8" COLLATE "utf8_spanish_ci" NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE  `folio_cotizacion` `folio_cotizacion` int NULL', undefined);
        // await queryRunner.query("ALTER TABLE `tie_facturas` ADD CONSTRAINT `FK_b4767e0f07c997d12c53911a3a8` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
