import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeColumMiniStore1587325814242 implements MigrationInterface {
    name = 'changeColumMiniStore1587325814242';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` DROP FOREIGN KEY `FK_3fdf7e28f6fe4a1507e96ce24fc`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_3cf740fb195cbcbc483d80ac290`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_3c48905595b506af616a2dfc8c5`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_4c0a06cefa4010abed3642cf457`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_4a203eb5f45ae37cf6ea462d813`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `miniStoreSalePaymentId` `salePaymentId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `miniStoreSaleId` `saleId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `agentBillingId` `cashierBillingId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `id_agente` `recaudadorId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `agentCancelingId` `paymentCancellerId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_3cf740fb195cbcbc483d80ac290` FOREIGN KEY (`saleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_3c48905595b506af616a2dfc8c5` FOREIGN KEY (`cashierBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_4a203eb5f45ae37cf6ea462d813` FOREIGN KEY (`recaudadorId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_4c0a06cefa4010abed3642cf457` FOREIGN KEY (`paymentCancellerId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` ADD CONSTRAINT `FK_3fdf7e28f6fe4a1507e96ce24fc` FOREIGN KEY (`salePaymentId`) REFERENCES `tie_venta_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` DROP FOREIGN KEY `FK_3fdf7e28f6fe4a1507e96ce24fc`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_3cf740fb195cbcbc483d80ac290`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_3c48905595b506af616a2dfc8c5`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_4c0a06cefa4010abed3642cf457`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_4a203eb5f45ae37cf6ea462d813`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `salePaymentId` `miniStoreSalePaymentId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `paymentCancellerId` `agentCancelingId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE  `cashierBillingId` `agentBillingId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `saleId` `miniStoreSaleId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE  `recaudadorId` `id_agente` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_3cf740fb195cbcbc483d80ac290` FOREIGN KEY (`miniStoreSaleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_3c48905595b506af616a2dfc8c5` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_4c0a06cefa4010abed3642cf457` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_4a203eb5f45ae37cf6ea462d813` FOREIGN KEY (`id_agente`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` ADD CONSTRAINT `FK_3fdf7e28f6fe4a1507e96ce24fc` FOREIGN KEY (`miniStoreSalePaymentId`) REFERENCES `tie_venta_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

}
