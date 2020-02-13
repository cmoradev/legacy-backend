import { MigrationInterface, QueryRunner } from 'typeorm';

export class enumchangestrintypecharge1581619248725 implements MigrationInterface {
    name = 'enumchangestrintypecharge1581619248725';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_descuentos` CHANGE `operation` `operation` enum (\'suma\', \'subtraction\', \'division\', \'multiplication\') NOT NULL DEFAULT \'suma\'', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_descuentos` CHANGE `operation` `operation` enum (\'1\', \'2\', \'3\', \'4\') CHARACTER SET "utf8" COLLATE "utf8_spanish_ci" NOT NULL DEFAULT \'1\'', undefined);
    }

}
