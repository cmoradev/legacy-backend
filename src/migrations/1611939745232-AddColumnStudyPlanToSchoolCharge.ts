import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnStudyPlanToSchoolCharge1611939745232 implements MigrationInterface {
    name = 'AddColumnStudyPlanToSchoolCharge1611939745232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_charges` ADD `studyPlansId` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges` ADD CONSTRAINT `FK_9e031d2ebfa55e174a7927b6086` FOREIGN KEY (`studyPlansId`) REFERENCES `study_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_9e031d2ebfa55e174a7927b6086`");
        await queryRunner.query("ALTER TABLE `school_charges` DROP COLUMN `studyPlansId`");
    }

}
