import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1713610090154 implements MigrationInterface {
    name = 'Test1713610090154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
    }

}
