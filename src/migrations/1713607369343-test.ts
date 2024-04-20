import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1713607369343 implements MigrationInterface {
    name = 'Test1713607369343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
