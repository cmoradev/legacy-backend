import {MigrationInterface, QueryRunner} from "typeorm";

export class invoiceDeleteStatus1589416636846 implements MigrationInterface {
    name = 'invoiceDeleteStatus1589416636846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `active` tinyint(1) NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `active`", undefined);
        await queryRunner.query("CREATE INDEX `FK_4a203eb5f45ae37cf6ea462d813` ON `tie_venta_pagos` (`recaudadorId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_4c0a06cefa4010abed3642cf457` ON `tie_venta_pagos` (`paymentCancellerId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_3c48905595b506af616a2dfc8c5` ON `tie_venta_pagos` (`cashierBillingId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_3cf740fb195cbcbc483d80ac290` ON `tie_venta_pagos` (`saleId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_3fdf7e28f6fe4a1507e96ce24fc` ON `tie_venta_forma_pago` (`salePaymentId`)", undefined);
    }

}
