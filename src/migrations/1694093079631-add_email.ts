import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmail1694093079631 implements MigrationInterface {
    name = 'addEmail1694093079631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alumnos\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`alumnos\` ADD \`notify\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alumnos\` DROP COLUMN \`notify\``);
        await queryRunner.query(`ALTER TABLE \`alumnos\` DROP COLUMN \`email\``);
    }

}
