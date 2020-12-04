import { MigrationInterface, QueryRunner } from 'typeorm';

export class schoolpayments1607110177390 implements MigrationInterface {
  name = 'schoolpayments1607110177390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `school_payment` DROP COLUMN `paidMonth`');
    await queryRunner.query('ALTER TABLE `school_payment` DROP COLUMN `paidDay`');
    await queryRunner.query('ALTER TABLE `route_action` DROP FOREIGN KEY `FK_2af40dd2596a3da300239f87afe`');
    await queryRunner.query('ALTER TABLE `route_action` DROP FOREIGN KEY `FK_95d4c3d3edbb09b8edd26cebb9f`');
    await queryRunner.query('ALTER TABLE `route_action` CHANGE `routeId` `routeId` int NULL');
    await queryRunner.query('ALTER TABLE `route_action` CHANGE `actionId` `actionId` int NULL');
    await queryRunner.query('ALTER TABLE `route_action` ADD CONSTRAINT `FK_2af40dd2596a3da300239f87afe` FOREIGN KEY (`routeId`) REFERENCES `route`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `route_action` ADD CONSTRAINT `FK_95d4c3d3edbb09b8edd26cebb9f` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `route_action` DROP FOREIGN KEY `FK_95d4c3d3edbb09b8edd26cebb9f`');
    await queryRunner.query('ALTER TABLE `route_action` DROP FOREIGN KEY `FK_2af40dd2596a3da300239f87afe`');
    await queryRunner.query('ALTER TABLE `route_action` CHANGE `actionId` `actionId` int NOT NULL');
    await queryRunner.query('ALTER TABLE `route_action` CHANGE `routeId` `routeId` int NOT NULL');
    await queryRunner.query('ALTER TABLE `route_action` ADD CONSTRAINT `FK_95d4c3d3edbb09b8edd26cebb9f` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `route_action` ADD CONSTRAINT `FK_2af40dd2596a3da300239f87afe` FOREIGN KEY (`routeId`) REFERENCES `route`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `school_payment` ADD `paidDay` int NULL');
    await queryRunner.query('ALTER TABLE `school_payment` ADD `paidMonth` int NULL');
  }

}
