import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeNivel1615319308464 implements MigrationInterface {
    name = 'removeNivel1615319308464';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_0c0ad3bf9d8d9b8153c6d1a8e5e`');
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE COLUMN `id_nivel` `id_nivel` varchar(255) NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_nivel` `id_nivel` int NULL');
        await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_0c0ad3bf9d8d9b8153c6d1a8e5e` FOREIGN KEY (`id_nivel`) REFERENCES `niveles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
