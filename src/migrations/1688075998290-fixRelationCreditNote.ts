import {MigrationInterface, QueryRunner} from "typeorm";

export class fixRelationCreditNote1688075998290 implements MigrationInterface {
    name = 'fixRelationCreditNote1688075998290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` DROP FOREIGN KEY \`FK_4c07a86f2e3c6d1358a8b014e93\``);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` DROP FOREIGN KEY \`FK_c8625c51548604bb996d523af8d\``);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` DROP FOREIGN KEY \`FK_abe18cd72aacd62ed072bef0e78\``);
        await queryRunner.query(`CREATE TABLE \`credit_notes_academy_invoices\` (\`acFacturasId\` int NOT NULL, \`creditNoteAcademyId\` int NOT NULL, INDEX \`IDX_a919d101fca74a595de24f444b\` (\`acFacturasId\`), INDEX \`IDX_1f368929f18590119aa519909a\` (\`creditNoteAcademyId\`), PRIMARY KEY (\`acFacturasId\`, \`creditNoteAcademyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`credit_notes_store_invoices\` (\`tieFacturasId\` int NOT NULL, \`creditNoteStoreId\` int NOT NULL, INDEX \`IDX_14a6562e660aa6cece396e66c1\` (\`tieFacturasId\`), INDEX \`IDX_5bf5633ed543a9de09ba25530d\` (\`creditNoteStoreId\`), PRIMARY KEY (\`tieFacturasId\`, \`creditNoteStoreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`credit_notes_school_invoices\` (\`schoolChargesInvoiceId\` int NOT NULL, \`creditNoteSchoolId\` int NOT NULL, INDEX \`IDX_6809c4435025aaa4fcb3db412a\` (\`schoolChargesInvoiceId\`), INDEX \`IDX_05a41d1888d8637a3eff30707c\` (\`creditNoteSchoolId\`), PRIMARY KEY (\`schoolChargesInvoiceId\`, \`creditNoteSchoolId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` DROP COLUMN \`creditNoteAcademyId\``);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` DROP COLUMN \`creditNoteStoreId\``);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` DROP COLUMN \`creditNotesSchoolId\``);
        await queryRunner.query(`ALTER TABLE \`credit_notes_academy_invoices\` ADD CONSTRAINT \`FK_a919d101fca74a595de24f444bc\` FOREIGN KEY (\`acFacturasId\`) REFERENCES \`ac_facturas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`credit_notes_academy_invoices\` ADD CONSTRAINT \`FK_1f368929f18590119aa519909ab\` FOREIGN KEY (\`creditNoteAcademyId\`) REFERENCES \`credit_note_academy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`credit_notes_store_invoices\` ADD CONSTRAINT \`FK_14a6562e660aa6cece396e66c18\` FOREIGN KEY (\`tieFacturasId\`) REFERENCES \`tie_facturas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`credit_notes_store_invoices\` ADD CONSTRAINT \`FK_5bf5633ed543a9de09ba25530d4\` FOREIGN KEY (\`creditNoteStoreId\`) REFERENCES \`credit_note_store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`credit_notes_school_invoices\` ADD CONSTRAINT \`FK_6809c4435025aaa4fcb3db412a0\` FOREIGN KEY (\`schoolChargesInvoiceId\`) REFERENCES \`school_charges_invoice\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`credit_notes_school_invoices\` ADD CONSTRAINT \`FK_05a41d1888d8637a3eff30707c3\` FOREIGN KEY (\`creditNoteSchoolId\`) REFERENCES \`credit_note_school\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`credit_notes_school_invoices\` DROP FOREIGN KEY \`FK_05a41d1888d8637a3eff30707c3\``);
        await queryRunner.query(`ALTER TABLE \`credit_notes_school_invoices\` DROP FOREIGN KEY \`FK_6809c4435025aaa4fcb3db412a0\``);
        await queryRunner.query(`ALTER TABLE \`credit_notes_store_invoices\` DROP FOREIGN KEY \`FK_5bf5633ed543a9de09ba25530d4\``);
        await queryRunner.query(`ALTER TABLE \`credit_notes_store_invoices\` DROP FOREIGN KEY \`FK_14a6562e660aa6cece396e66c18\``);
        await queryRunner.query(`ALTER TABLE \`credit_notes_academy_invoices\` DROP FOREIGN KEY \`FK_1f368929f18590119aa519909ab\``);
        await queryRunner.query(`ALTER TABLE \`credit_notes_academy_invoices\` DROP FOREIGN KEY \`FK_a919d101fca74a595de24f444bc\``);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` ADD \`creditNotesSchoolId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` ADD \`creditNoteStoreId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` ADD \`creditNoteAcademyId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_05a41d1888d8637a3eff30707c\` ON \`credit_notes_school_invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_6809c4435025aaa4fcb3db412a\` ON \`credit_notes_school_invoices\``);
        await queryRunner.query(`DROP TABLE \`credit_notes_school_invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_5bf5633ed543a9de09ba25530d\` ON \`credit_notes_store_invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_14a6562e660aa6cece396e66c1\` ON \`credit_notes_store_invoices\``);
        await queryRunner.query(`DROP TABLE \`credit_notes_store_invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f368929f18590119aa519909a\` ON \`credit_notes_academy_invoices\``);
        await queryRunner.query(`DROP INDEX \`IDX_a919d101fca74a595de24f444b\` ON \`credit_notes_academy_invoices\``);
        await queryRunner.query(`DROP TABLE \`credit_notes_academy_invoices\``);
        await queryRunner.query(`ALTER TABLE \`school_charges_invoice\` ADD CONSTRAINT \`FK_abe18cd72aacd62ed072bef0e78\` FOREIGN KEY (\`creditNotesSchoolId\`) REFERENCES \`credit_note_school\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tie_facturas\` ADD CONSTRAINT \`FK_c8625c51548604bb996d523af8d\` FOREIGN KEY (\`creditNoteStoreId\`) REFERENCES \`credit_note_store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ac_facturas\` ADD CONSTRAINT \`FK_4c07a86f2e3c6d1358a8b014e93\` FOREIGN KEY (\`creditNoteAcademyId\`) REFERENCES \`credit_note_academy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
