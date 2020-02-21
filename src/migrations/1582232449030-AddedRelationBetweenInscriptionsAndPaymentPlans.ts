import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRelationBetweenInscriptionsAndPaymentPlans1582232449030 implements MigrationInterface {
    name = 'AddedRelationBetweenInscriptionsAndPaymentPlans1582232449030';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX `IDX_a4cc50b75b7419e73f088d8f31` ON `school_payment`', undefined);
        await queryRunner.query('ALTER TABLE `inscripciones` ADD `paymentPlanId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `inscripciones` ADD CONSTRAINT `FK_2cf1b93afaa1931400ee401ff5a` FOREIGN KEY (`paymentPlanId`) REFERENCES `payment_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `inscripciones` DROP FOREIGN KEY `FK_2cf1b93afaa1931400ee401ff5a`', undefined);
        await queryRunner.query('ALTER TABLE `inscripciones` DROP COLUMN `paymentPlanId`', undefined);
        await queryRunner.query('CREATE UNIQUE INDEX `IDX_a4cc50b75b7419e73f088d8f31` ON `school_payment` (`paymentPlanConceptId`)', undefined);
    }

}
