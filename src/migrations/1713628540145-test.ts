import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1713628540145 implements MigrationInterface {
    name = 'Test1713628540145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`scopes\``);
        await queryRunner.query(`ALTER TABLE \`auth_scope\` ADD \`client_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_scope\` ADD CONSTRAINT \`FK_53574ee2551279402ead463e0e9\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_scope\` DROP FOREIGN KEY \`FK_53574ee2551279402ead463e0e9\``);
        await queryRunner.query(`ALTER TABLE \`auth_scope\` DROP COLUMN \`client_id\``);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`scopes\` json NOT NULL`);
    }

}
