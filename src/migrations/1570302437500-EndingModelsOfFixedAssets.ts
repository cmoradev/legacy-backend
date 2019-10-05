import { MigrationInterface, QueryRunner } from 'typeorm';

export class EndingModelsOfFixedAssets1570302437500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `fixed_asset` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `model` varchar(255) NOT NULL, `brand` varchar(255) NOT NULL, `serie` varchar(255) NOT NULL, `purchasePrice` decimal(15,6) NOT NULL DEFAULT \'0.000000\', `purchaseDate` datetime NOT NULL, `invoiceUrl` varchar(255) NOT NULL, `photoUrl` varchar(255) NOT NULL, `status` enum (\'Available\', \'Assigned\', \'NotAvailable\') NOT NULL DEFAULT \'Available\', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `fixed_asset_assignment` (`id` int NOT NULL AUTO_INCREMENT, `status` enum (\'Assigned\', \'Returned\', \'NotReturned\') NOT NULL DEFAULT \'Assigned\', `dateOfDelivery` timestamp NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `employeeId` int NULL, `fixedAssetId` int NULL, `responsiveLetterId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `responsive_letter` (`id` int NOT NULL AUTO_INCREMENT, `expeditionDate` datetime NOT NULL, `signatureUrl` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `jobPositionId` int NULL, `employeeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `job_position` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `branchCompanyId` int NULL, `departmentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `employee` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `job_position_employees_employee` (`jobPositionId` int NOT NULL, `employeeId` int NOT NULL, INDEX `IDX_205e13f4586302018172103633` (`jobPositionId`), INDEX `IDX_cbb6da713651df9e718eb8072a` (`employeeId`), PRIMARY KEY (`jobPositionId`, `employeeId`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `branch_company_employees_employee` (`branchCompanyId` int NOT NULL, `employeeId` int NOT NULL, INDEX `IDX_084722c09aeaef14e018fced45` (`branchCompanyId`), INDEX `IDX_bf4c274ef0e83118beb86fdf8b` (`employeeId`), PRIMARY KEY (`branchCompanyId`, `employeeId`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `matrix_company` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `matrix_company` ADD `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `branch_company` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `branch_company` ADD `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` double NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_cb47ea0d9a1b4963365891cde88` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_f9c314976f45b7f2c2580713619` FOREIGN KEY (`fixedAssetId`) REFERENCES `fixed_asset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_b2bfd20bf6c9248dc268848537b` FOREIGN KEY (`responsiveLetterId`) REFERENCES `responsive_letter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `responsive_letter` ADD CONSTRAINT `FK_d2406bb3dbf76cfc3cae2d5fccd` FOREIGN KEY (`jobPositionId`) REFERENCES `job_position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `responsive_letter` ADD CONSTRAINT `FK_351d3c36b3f3b3f9e81f8cfbc54` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `job_position` ADD CONSTRAINT `FK_4fbed8184a7860bbc3fd8b043a4` FOREIGN KEY (`branchCompanyId`) REFERENCES `branch_company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `job_position` ADD CONSTRAINT `FK_d098ea55d79f56d84c39b1d05ba` FOREIGN KEY (`departmentId`) REFERENCES `departamentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `job_position_employees_employee` ADD CONSTRAINT `FK_205e13f45863020181721036336` FOREIGN KEY (`jobPositionId`) REFERENCES `job_position`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `job_position_employees_employee` ADD CONSTRAINT `FK_cbb6da713651df9e718eb8072a4` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `branch_company_employees_employee` ADD CONSTRAINT `FK_084722c09aeaef14e018fced453` FOREIGN KEY (`branchCompanyId`) REFERENCES `branch_company`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `branch_company_employees_employee` ADD CONSTRAINT `FK_bf4c274ef0e83118beb86fdf8b9` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `branch_company_employees_employee` DROP FOREIGN KEY `FK_bf4c274ef0e83118beb86fdf8b9`', undefined);
        await queryRunner.query('ALTER TABLE `branch_company_employees_employee` DROP FOREIGN KEY `FK_084722c09aeaef14e018fced453`', undefined);
        await queryRunner.query('ALTER TABLE `job_position_employees_employee` DROP FOREIGN KEY `FK_cbb6da713651df9e718eb8072a4`', undefined);
        await queryRunner.query('ALTER TABLE `job_position_employees_employee` DROP FOREIGN KEY `FK_205e13f45863020181721036336`', undefined);
        await queryRunner.query('ALTER TABLE `job_position` DROP FOREIGN KEY `FK_d098ea55d79f56d84c39b1d05ba`', undefined);
        await queryRunner.query('ALTER TABLE `job_position` DROP FOREIGN KEY `FK_4fbed8184a7860bbc3fd8b043a4`', undefined);
        await queryRunner.query('ALTER TABLE `responsive_letter` DROP FOREIGN KEY `FK_351d3c36b3f3b3f9e81f8cfbc54`', undefined);
        await queryRunner.query('ALTER TABLE `responsive_letter` DROP FOREIGN KEY `FK_d2406bb3dbf76cfc3cae2d5fccd`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_b2bfd20bf6c9248dc268848537b`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_f9c314976f45b7f2c2580713619`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_cb47ea0d9a1b4963365891cde88`', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` double(22) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `branch_company` DROP COLUMN `updated_at`', undefined);
        await queryRunner.query('ALTER TABLE `branch_company` DROP COLUMN `created_at`', undefined);
        await queryRunner.query('ALTER TABLE `matrix_company` DROP COLUMN `updated_at`', undefined);
        await queryRunner.query('ALTER TABLE `matrix_company` DROP COLUMN `created_at`', undefined);
        await queryRunner.query('DROP INDEX `IDX_bf4c274ef0e83118beb86fdf8b` ON `branch_company_employees_employee`', undefined);
        await queryRunner.query('DROP INDEX `IDX_084722c09aeaef14e018fced45` ON `branch_company_employees_employee`', undefined);
        await queryRunner.query('DROP TABLE `branch_company_employees_employee`', undefined);
        await queryRunner.query('DROP INDEX `IDX_cbb6da713651df9e718eb8072a` ON `job_position_employees_employee`', undefined);
        await queryRunner.query('DROP INDEX `IDX_205e13f4586302018172103633` ON `job_position_employees_employee`', undefined);
        await queryRunner.query('DROP TABLE `job_position_employees_employee`', undefined);
        await queryRunner.query('DROP TABLE `employee`', undefined);
        await queryRunner.query('DROP TABLE `job_position`', undefined);
        await queryRunner.query('DROP TABLE `responsive_letter`', undefined);
        await queryRunner.query('DROP TABLE `fixed_asset_assignment`', undefined);
        await queryRunner.query('DROP TABLE `fixed_asset`', undefined);
    }

}
