import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1713627484950 implements MigrationInterface {
    name = 'Test1713627484950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`secret\` varchar(255) NULL, \`client\` varchar(255) NULL, \`redirectUris\` longtext NOT NULL, \`allowedGrants\` longtext NOT NULL, \`scopes\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth_scope\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token\` (\`id\` varchar(36) NOT NULL, \`accessToken\` varchar(255) NOT NULL, \`accessTokenExpiresAt\` datetime NOT NULL, \`refreshToken\` varchar(255) NULL, \`refreshTokenExpiresAt\` datetime NULL, \`client_id\` varchar(255) NULL, \`user_id\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth_code\` (\`code\` varchar(36) NOT NULL, \`codeChallenge\` varchar(255) NULL, \`codeChallengeMethod\` varchar(255) NULL, \`redirectUri\` varchar(255) NULL, \`user_id\` int NULL, \`client_id\` varchar(255) NULL, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`access_token_scopes\` (\`token_id\` varchar(36) NOT NULL, \`scope_id\` varchar(36) NOT NULL, INDEX \`IDX_71878974cb62cc30eea11e5ec7\` (\`token_id\`), INDEX \`IDX_ffb13eb0342fce1308476a908b\` (\`scope_id\`), PRIMARY KEY (\`token_id\`, \`scope_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth_code_scopes\` (\`code\` varchar(36) NOT NULL, \`scope_id\` varchar(36) NOT NULL, INDEX \`IDX_7be08c1bc1f91485ed2953d6c4\` (\`code\`), INDEX \`IDX_15bf89f7d7cdaf371a80531c69\` (\`scope_id\`), PRIMARY KEY (\`code\`, \`scope_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_5034edd739fb0be550e863b674c\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_e50ca89d635960fda2ffeb17639\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_code\` ADD CONSTRAINT \`FK_ac63617062f02037922c67541f6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_code\` ADD CONSTRAINT \`FK_ed1af53773a2dd01c47821b6747\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access_token_scopes\` ADD CONSTRAINT \`FK_71878974cb62cc30eea11e5ec70\` FOREIGN KEY (\`token_id\`) REFERENCES \`token\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`access_token_scopes\` ADD CONSTRAINT \`FK_ffb13eb0342fce1308476a908ba\` FOREIGN KEY (\`scope_id\`) REFERENCES \`auth_scope\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`auth_code_scopes\` ADD CONSTRAINT \`FK_7be08c1bc1f91485ed2953d6c48\` FOREIGN KEY (\`code\`) REFERENCES \`auth_code\`(\`code\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`auth_code_scopes\` ADD CONSTRAINT \`FK_15bf89f7d7cdaf371a80531c692\` FOREIGN KEY (\`scope_id\`) REFERENCES \`auth_scope\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth_code_scopes\` DROP FOREIGN KEY \`FK_15bf89f7d7cdaf371a80531c692\``);
        await queryRunner.query(`ALTER TABLE \`auth_code_scopes\` DROP FOREIGN KEY \`FK_7be08c1bc1f91485ed2953d6c48\``);
        await queryRunner.query(`ALTER TABLE \`access_token_scopes\` DROP FOREIGN KEY \`FK_ffb13eb0342fce1308476a908ba\``);
        await queryRunner.query(`ALTER TABLE \`access_token_scopes\` DROP FOREIGN KEY \`FK_71878974cb62cc30eea11e5ec70\``);
        await queryRunner.query(`ALTER TABLE \`auth_code\` DROP FOREIGN KEY \`FK_ed1af53773a2dd01c47821b6747\``);
        await queryRunner.query(`ALTER TABLE \`auth_code\` DROP FOREIGN KEY \`FK_ac63617062f02037922c67541f6\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_e50ca89d635960fda2ffeb17639\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_5034edd739fb0be550e863b674c\``);
        await queryRunner.query(`DROP INDEX \`IDX_15bf89f7d7cdaf371a80531c69\` ON \`auth_code_scopes\``);
        await queryRunner.query(`DROP INDEX \`IDX_7be08c1bc1f91485ed2953d6c4\` ON \`auth_code_scopes\``);
        await queryRunner.query(`DROP TABLE \`auth_code_scopes\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffb13eb0342fce1308476a908b\` ON \`access_token_scopes\``);
        await queryRunner.query(`DROP INDEX \`IDX_71878974cb62cc30eea11e5ec7\` ON \`access_token_scopes\``);
        await queryRunner.query(`DROP TABLE \`access_token_scopes\``);
        await queryRunner.query(`DROP TABLE \`auth_code\``);
        await queryRunner.query(`DROP TABLE \`token\``);
        await queryRunner.query(`DROP TABLE \`auth_scope\``);
        await queryRunner.query(`DROP TABLE \`client\``);
    }

}
