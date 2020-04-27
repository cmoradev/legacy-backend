import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPropertyProducts1587997589443 implements MigrationInterface {
    name = 'addPropertyProducts1587997589443';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX `IDX_6049767042b20caec88465d7e5` ON `ac_cobro_detalle`', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` ADD `isFavorite` tinyint(1) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` ADD `picture` text NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_productos` DROP COLUMN `picture`', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` DROP COLUMN `isFavorite`', undefined);
        await queryRunner.query('CREATE UNIQUE INDEX `IDX_6049767042b20caec88465d7e5` ON `ac_cobro_detalle` (`academyInscriptionConceptId`)', undefined);
    }

}
