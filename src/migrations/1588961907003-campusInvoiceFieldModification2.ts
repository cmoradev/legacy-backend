import {MigrationInterface, QueryRunner} from "typeorm";

export class campusInvoiceFieldModification21588961907003 implements MigrationInterface {
    name = 'campusInvoiceFieldModification21588961907003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` CHANGE `campus_id` `id_modalidad` enum ('1', '2', '3') CHARACTER SET \"utf8\" COLLATE \"utf8_spanish_ci\" NOT NULL DEFAULT '3'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` CHANGE `id_modalidad` `campus_id` enum ('1', '2', '3') CHARACTER SET \"utf8\" COLLATE \"utf8_spanish_ci\" NOT NULL DEFAULT '3'", undefined);
        await queryRunner.query("CREATE INDEX `FK_4a203eb5f45ae37cf6ea462d813` ON `tie_venta_pagos` (`recaudadorId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_4c0a06cefa4010abed3642cf457` ON `tie_venta_pagos` (`paymentCancellerId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_3c48905595b506af616a2dfc8c5` ON `tie_venta_pagos` (`cashierBillingId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_3cf740fb195cbcbc483d80ac290` ON `tie_venta_pagos` (`saleId`)", undefined);
        await queryRunner.query("CREATE INDEX `FK_3fdf7e28f6fe4a1507e96ce24fc` ON `tie_venta_forma_pago` (`salePaymentId`)", undefined);
    }

}
