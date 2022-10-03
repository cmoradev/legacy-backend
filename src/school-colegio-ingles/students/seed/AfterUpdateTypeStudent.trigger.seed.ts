import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class AfterUpdateTypeStudentTriggerSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner = connection;
    await queryRunner.query(`DROP TRIGGER IF EXISTS change_matricula_update_type`);
    await queryRunner.query(`
    CREATE TRIGGER change_matricula_update_type BEFORE UPDATE ON alumnos

    FOR EACH ROW
      BEGIN
      DECLARE prefix VARCHAR(20);
      DECLARE nuevaMatricula VARCHAR(20);
      DECLARE consecutive INT(11);
      IF !(NEW.id_modalidad <=> OLD.id_modalidad) THEN
        SET consecutive = (SELECT COUNT(*) AS total FROM alumnos WHERE id_modalidad = NEW.id_modalidad) + 1;

        IF NEW.id_modalidad = 1 THEN SET prefix = 'ALM';

        ELSEIF NEW.id_modalidad = 2 THEN SET prefix = 'CLT';

        ELSE SET prefix = 'PRO';

        END IF;
            
        SET nuevaMatricula = (CONCAT_WS('-', prefix, (consecutive))); 

        WHILE (SELECT COUNT(*) AS total FROM alumnos WHERE matricula = nuevaMatricula) > 0 DO
          SET consecutive = consecutive + 1;
          SET nuevaMatricula = (CONCAT_WS('-', prefix, (consecutive))); 
        END WHILE;
        SET NEW.matricula = nuevaMatricula; 
      END IF;
	  END`);

  }
}
