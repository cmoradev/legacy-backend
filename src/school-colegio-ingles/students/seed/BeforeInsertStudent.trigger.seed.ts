import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertStudentTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_students_insert`);
        await queryRunner.query(`
        CREATE TRIGGER before_students_insert BEFORE INSERT ON alumnos

        FOR EACH ROW
            BEGIN
            DECLARE prefix VARCHAR(20);
            SET @consecutive = (SELECT COUNT(*) AS total FROM alumnos WHERE id_modalidad = NEW.id_modalidad);

            IF NEW.id_modalidad = 1 THEN SET prefix = 'ALM';
            ELSEIF NEW.id_modalidad = 2 THEN SET prefix = 'CLT';
            ELSE SET prefix = 'PRO';
            END IF;
            
            SET @matricula = (CONCAT_WS('-', prefix, (@consecutive + 1))); 
            SET NEW.matricula = @matricula; 
       
	    END`);

    }
}
