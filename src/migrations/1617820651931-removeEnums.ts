import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeEnums1617820651931 implements MigrationInterface {
  name = 'removeEnums1617820651931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `alumnos` CHANGE `statusStudentInscription` `statusStudentInscription` enum (\'0\', \'1\') NOT NULL DEFAULT \'1\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `alumnos` CHANGE `statusStudentInscription` `statusStudentInscription` enum (\'0\', \'1\', \'2\', \'3\') NOT NULL DEFAULT \'0\'');
  }

}
