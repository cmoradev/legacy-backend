import { MigrationInterface, QueryRunner } from 'typeorm';

export class extendebaseacademycharge1591136368429 implements MigrationInterface {
    name = 'extendebaseacademycharge1591136368429';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `updatedAt` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE  `createdAt` `created_at`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    }

}
