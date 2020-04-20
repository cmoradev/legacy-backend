import {MigrationInterface, QueryRunner} from "typeorm";

export class test1587328290074 implements MigrationInterface {
    name = 'test1587328290074'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` DROP FOREIGN KEY `FK_3fdf7e28f6fe4a1507e96ce24fc`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_3c48905595b506af616a2dfc8c5`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_3cf740fb195cbcbc483d80ac290`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_4a203eb5f45ae37cf6ea462d813`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_4c0a06cefa4010abed3642cf457`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` ADD CONSTRAINT `FK_ddbfd86a04f68b6801dd942fd8f` FOREIGN KEY (`salePaymentId`) REFERENCES `tie_venta_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_f64b8e219bde77f21ecce71771e` FOREIGN KEY (`saleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_521a58d10625c540826ddf4fefc` FOREIGN KEY (`cashierBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_6fec9a93e9467cc12aa2aee4f63` FOREIGN KEY (`recaudadorId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_cf77352b06be062b4f569df4658` FOREIGN KEY (`paymentCancellerId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_cf77352b06be062b4f569df4658`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_6fec9a93e9467cc12aa2aee4f63`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_521a58d10625c540826ddf4fefc`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_f64b8e219bde77f21ecce71771e`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` DROP FOREIGN KEY `FK_ddbfd86a04f68b6801dd942fd8f`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_4c0a06cefa4010abed3642cf457` FOREIGN KEY (`paymentCancellerId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_4a203eb5f45ae37cf6ea462d813` FOREIGN KEY (`recaudadorId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_3cf740fb195cbcbc483d80ac290` FOREIGN KEY (`saleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_3c48905595b506af616a2dfc8c5` FOREIGN KEY (`cashierBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` ADD CONSTRAINT `FK_3fdf7e28f6fe4a1507e96ce24fc` FOREIGN KEY (`salePaymentId`) REFERENCES `tie_venta_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
