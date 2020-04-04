import { MigrationInterface, QueryRunner } from 'typeorm';

export class ministoretransactions1586016838616 implements MigrationInterface {
    name = 'ministoretransactions1586016838616';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `tie_transaction` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `reasonTransaction` text NULL, `quantity` decimal(15,6) NOT NULL DEFAULT 0.000000, `description` text NULL, `applicationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `transactionType` enum (\'income\', \'expenses\', \'moneyOut\') NOT NULL DEFAULT \'income\', `transactionUserId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` ADD CONSTRAINT `FK_92200557487fafc0dcb62e2913f` FOREIGN KEY (`transactionUserId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_transaction` DROP FOREIGN KEY `FK_92200557487fafc0dcb62e2913f`', undefined);
        await queryRunner.query('DROP TABLE `tie_transaction`', undefined);
    }

}
