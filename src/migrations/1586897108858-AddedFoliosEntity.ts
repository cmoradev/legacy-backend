import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedFoliosEntity1586897108858 implements MigrationInterface {
    name = 'AddedFoliosEntity1586897108858';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `folios` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `salesFolio` int NOT NULL DEFAULT 0, `salesPrefix` varchar(255) NOT NULL DEFAULT \'XXXXXX-\', `paymentsFolio` int NOT NULL DEFAULT 0, `paymentsPrefix` varchar(255) NOT NULL DEFAULT \'XXXXXX-\', `quotationsFolio` int NOT NULL DEFAULT 0, `quotationsPrefix` varchar(255) NOT NULL DEFAULT \'XXXXXX-\', `invoicesFolio` int NOT NULL DEFAULT 0, `invoicesPrefix` varchar(255) NOT NULL DEFAULT \'XXXXXX-\', PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `folios`', undefined);
    }

}
