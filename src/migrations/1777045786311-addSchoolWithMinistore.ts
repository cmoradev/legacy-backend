import {MigrationInterface, QueryRunner} from "typeorm";

export class addSchoolWithMinistore1777045786311 implements MigrationInterface {
    name = 'addSchoolWithMinistore1777045786311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`school_payment\` ADD \`ministoreSale\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`school_payment\` ADD \`ministorePayment\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`school_payment\` DROP COLUMN \`ministorePayment\``);
        await queryRunner.query(`ALTER TABLE \`school_payment\` DROP COLUMN \`ministoreSale\``);
    }

}
