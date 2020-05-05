import {MigrationInterface, QueryRunner} from "typeorm";

export class extedtobasepayments1588686725427 implements MigrationInterface {
    name = 'extedtobasepayments1588686725427'

    public async up(queryRunner: QueryRunner): Promise<any> {
         await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `created_at`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `updated_at`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `version` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `uuid` varchar(36) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `uuid`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `version`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
    }

}
