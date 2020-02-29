import { MigrationInterface, QueryRunner } from 'typeorm';

export class WereReplacedColumnsByRelations1582999760981 implements MigrationInterface {
    name = 'WereReplacedColumnsByRelations1582999760981';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_3ed7fb60853bb5dbdd9e3f88a65`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD `uuid` varchar(36) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `id_agente` `id_agente` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `ciclo` `ciclo` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_3ed7fb60853bb5dbdd9e3f88a65` FOREIGN KEY (`id_agente`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_0cb46f1027849829a0a3d77383c` FOREIGN KEY (`ciclo`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_0cb46f1027849829a0a3d77383c`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_3ed7fb60853bb5dbdd9e3f88a65`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `ciclo` `ciclo` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `id_agente` `id_agente` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD `uuid` varchar(300) NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_3ed7fb60853bb5dbdd9e3f88a65` FOREIGN KEY (`id_agente`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

}
