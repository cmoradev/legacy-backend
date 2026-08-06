import {MigrationInterface, QueryRunner} from "typeorm";

export class addPendingStampUUID1786032061484 implements MigrationInterface {
    name = 'addPendingStampUUID1786032061484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` ADD \`pending_stamp_uuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` ADD \`pending_stamp_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` ADD \`pending_stamp_uuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` ADD \`pending_stamp_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` ADD \`pending_stamp_uuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` ADD \`pending_stamp_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` DROP COLUMN \`pending_stamp_at\``);
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` DROP COLUMN \`pending_stamp_uuid\``);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` DROP COLUMN \`pending_stamp_at\``);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` DROP COLUMN \`pending_stamp_uuid\``);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` DROP COLUMN \`pending_stamp_at\``);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` DROP COLUMN \`pending_stamp_uuid\``);        
    }

}
