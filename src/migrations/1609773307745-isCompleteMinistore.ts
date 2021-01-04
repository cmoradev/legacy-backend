import { MigrationInterface, QueryRunner } from 'typeorm';

export class isCompleteMinistore1609773307745 implements MigrationInterface {
  name = 'isCompleteMinistore1609773307745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `id_externo`');
    await queryRunner.query('ALTER TABLE `tie_ventas` ADD `isComplete` int(1) NOT NULL DEFAULT \'0\'');
    await queryRunner.query('ALTER TABLE `tie_ventas` ADD `expiredAt` timestamp NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `expiredAt`');
    await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `isComplete`');
    await queryRunner.query('ALTER TABLE `tie_ventas` ADD `id_externo` int NOT NULL DEFAULT \'0\'');
  }

}
