import { MigrationInterface, QueryRunner } from 'typeorm';

export class routeAction1606754211620 implements MigrationInterface {
    name = 'routeAction1606754211620';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `route_action` (`id` int NOT NULL AUTO_INCREMENT, `routeId` int NOT NULL, `actionId` int NOT NULL, PRIMARY KEY (`id`, `routeId`, `actionId`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `route_action` ADD CONSTRAINT `FK_2af40dd2596a3da300239f87afe` FOREIGN KEY (`routeId`) REFERENCES `route`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `route_action` ADD CONSTRAINT `FK_95d4c3d3edbb09b8edd26cebb9f` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `route_action` DROP FOREIGN KEY `FK_95d4c3d3edbb09b8edd26cebb9f`');
        await queryRunner.query('ALTER TABLE `route_action` DROP FOREIGN KEY `FK_2af40dd2596a3da300239f87afe`');
        await queryRunner.query('DROP TABLE `route_action`');
    }

}
