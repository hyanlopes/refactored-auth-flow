import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1711058119025 implements MigrationInterface {
    name = 'Initial1711058119025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`auth_typeorm\` (\`id\` varchar(36) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_typeorm\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`authId\` varchar(36) NULL, UNIQUE INDEX \`IDX_7e1f26991415d8121b2de064bd\` (\`email\`), UNIQUE INDEX \`REL_4572457bfca3d812b430c14497\` (\`authId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_typeorm\` ADD CONSTRAINT \`FK_4572457bfca3d812b430c144975\` FOREIGN KEY (\`authId\`) REFERENCES \`auth_typeorm\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_typeorm\` DROP FOREIGN KEY \`FK_4572457bfca3d812b430c144975\``);
        await queryRunner.query(`DROP INDEX \`REL_4572457bfca3d812b430c14497\` ON \`user_typeorm\``);
        await queryRunner.query(`DROP INDEX \`IDX_7e1f26991415d8121b2de064bd\` ON \`user_typeorm\``);
        await queryRunner.query(`DROP TABLE \`user_typeorm\``);
        await queryRunner.query(`DROP TABLE \`auth_typeorm\``);
    }

}
