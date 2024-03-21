import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1711058160695 implements MigrationInterface {
    name = 'Initial1711058160695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Auth\` (\`id\` varchar(36) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`authId\` varchar(36) NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`REL_bf622c72716c4cb571d0bd6348\` (\`authId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD CONSTRAINT \`FK_bf622c72716c4cb571d0bd63487\` FOREIGN KEY (\`authId\`) REFERENCES \`Auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP FOREIGN KEY \`FK_bf622c72716c4cb571d0bd63487\``);
        await queryRunner.query(`DROP INDEX \`REL_bf622c72716c4cb571d0bd6348\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Auth\``);
    }

}
