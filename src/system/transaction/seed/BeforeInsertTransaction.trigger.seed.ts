import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertTransactionTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_transaction_insert_update_saldo`);
        await queryRunner.query(`
        CREATE TRIGGER before_transaction_insert_update_saldo BEFORE INSERT ON transaction
        FOR EACH ROW BEGIN 
            UPDATE alumnos SET saldo = NEW.balance WHERE id = NEW.studentId;
	    END`);

    }
}
