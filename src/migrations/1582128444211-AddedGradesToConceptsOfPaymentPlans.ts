import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedGradesToConceptsOfPaymentPlans1582128444211 implements MigrationInterface {
    name = 'AddedGradesToConceptsOfPaymentPlans1582128444211';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `payment_plan_concept_grades_grados` (`paymentPlanConceptId` int NOT NULL, `gradosId` int NOT NULL, INDEX `IDX_ef8914ac308e77027e953092ba` (`paymentPlanConceptId`), INDEX `IDX_0d98362262ba192a9a9fd81009` (`gradosId`), PRIMARY KEY (`paymentPlanConceptId`, `gradosId`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept_grades_grados` ADD CONSTRAINT `FK_ef8914ac308e77027e953092ba5` FOREIGN KEY (`paymentPlanConceptId`) REFERENCES `payment_plan_concept`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept_grades_grados` ADD CONSTRAINT `FK_0d98362262ba192a9a9fd810093` FOREIGN KEY (`gradosId`) REFERENCES `grados`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `payment_plan_concept_grades_grados` DROP FOREIGN KEY `FK_0d98362262ba192a9a9fd810093`', undefined);
        await queryRunner.query('ALTER TABLE `payment_plan_concept_grades_grados` DROP FOREIGN KEY `FK_ef8914ac308e77027e953092ba5`', undefined);
        await queryRunner.query('DROP INDEX `IDX_0d98362262ba192a9a9fd81009` ON `payment_plan_concept_grades_grados`', undefined);
        await queryRunner.query('DROP INDEX `IDX_ef8914ac308e77027e953092ba` ON `payment_plan_concept_grades_grados`', undefined);
        await queryRunner.query('DROP TABLE `payment_plan_concept_grades_grados`', undefined);
    }

}
