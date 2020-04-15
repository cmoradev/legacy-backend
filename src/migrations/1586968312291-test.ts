import {MigrationInterface, QueryRunner} from "typeorm";

export class test1586968312291 implements MigrationInterface {
    name = 'test1586968312291'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_42f725a32538bf2a1aa55a1d8b` ON `school_charge_details`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_42f725a32538bf2a1aa55a1d8b` ON `school_charge_details` (`schoolPlanPaymentId`)", undefined);
    }

}
