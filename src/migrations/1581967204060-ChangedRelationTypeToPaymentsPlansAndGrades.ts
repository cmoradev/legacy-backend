import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedRelationTypeToPaymentsPlansAndGrades1581967204060 implements MigrationInterface {
    name = 'ChangedRelationTypeToPaymentsPlansAndGrades1581967204060';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan` DROP FOREIGN KEY `FK_458d665957e2acdf7c79e30371c`', undefined);
        await queryRunner.query('DROP INDEX `REL_458d665957e2acdf7c79e30371` ON `payment_plan`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` DROP COLUMN `gradeId`', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan` ADD `gradeId` int NULL', undefined);
        await queryRunner.query('CREATE UNIQUE INDEX `REL_458d665957e2acdf7c79e30371` ON `payment_plan` (`gradeId`)', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan` ADD CONSTRAINT `FK_458d665957e2acdf7c79e30371c` FOREIGN KEY (`gradeId`) REFERENCES `grados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

}
