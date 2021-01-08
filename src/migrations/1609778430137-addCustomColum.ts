import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCustomColum1609778430137 implements MigrationInterface {
  name = 'addCustomColum1609778430137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `daysQuoteValid` int(2) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `daysQuoteValid`');
  }

}
