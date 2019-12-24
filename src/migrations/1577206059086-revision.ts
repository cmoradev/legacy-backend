import {MigrationInterface, QueryRunner} from "typeorm";

export class revision1577206059086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `facturacion_claves` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT '0.000'", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_estados` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `motivo_baja` `motivo_baja` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_academia` `id_academia` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_alumno` `id_alumno` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_plantel` `id_plantel` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_ac_grupo` `id_ac_grupo` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_agente` `id_agente` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_agente_baja` `id_agente_baja` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_estado_inscripcion` `id_estado_inscripcion` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_ciclo` `id_ciclo` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_96bf0f4b60156ee3315d53e7ac1` FOREIGN KEY (`id_academia`) REFERENCES `ac_academias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_050de20fcb61de78cd38bc19249` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_0c890b90c35a1c429185f7e02b1` FOREIGN KEY (`id_plantel`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_bf77d430ac7ccd44d4e3d02e8c5` FOREIGN KEY (`id_ac_grupo`) REFERENCES `ac_grupos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_cffd7972c07dcf80c42b00290c2` FOREIGN KEY (`id_agente`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_dad8cfd75b36a8af06fc41fb964` FOREIGN KEY (`id_agente_baja`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_1fc062f5ed9cb150ff14b5fe7f6` FOREIGN KEY (`id_estado_inscripcion`) REFERENCES `ac_inscrip_estados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` ADD CONSTRAINT `FK_c079018a77ecb7046ca99e4f63b` FOREIGN KEY (`id_ciclo`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_0c0ad3bf9d8d9b8153c6d1a8e5e`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_c079018a77ecb7046ca99e4f63b`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_1fc062f5ed9cb150ff14b5fe7f6`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_dad8cfd75b36a8af06fc41fb964`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_cffd7972c07dcf80c42b00290c2`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_bf77d430ac7ccd44d4e3d02e8c5`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_0c890b90c35a1c429185f7e02b1`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_050de20fcb61de78cd38bc19249`", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` DROP FOREIGN KEY `FK_96bf0f4b60156ee3315d53e7ac1`", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_ciclo` `id_ciclo` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_estado_inscripcion` `id_estado_inscripcion` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_agente_baja` `id_agente_baja` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_agente` `id_agente` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_ac_grupo` `id_ac_grupo` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_plantel` `id_plantel` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_alumno` `id_alumno` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `id_academia` `id_academia` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscripciones_alumnos` CHANGE `motivo_baja` `motivo_baja` varchar(255) CHARACTER SET \"utf8\" COLLATE \"utf8_spanish_ci\" NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_estados` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT '0.00'", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_claves` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
    }

}
