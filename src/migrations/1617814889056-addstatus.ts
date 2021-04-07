import { MigrationInterface, QueryRunner } from 'typeorm';

export class addstatus1617814889056 implements MigrationInterface {
  name = 'addstatus1617814889056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `inscripciones` CHANGE COLUMN `id_status` `id_status` enum (\'0\', \'1\', \'2\', \'3\') NOT NULL DEFAULT \'1\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `inscripciones` ADD `id_status` int NOT NULL');
  }

}
