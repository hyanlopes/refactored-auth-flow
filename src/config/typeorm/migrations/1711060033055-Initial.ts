import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1711060033055 implements MigrationInterface {
    name = 'Initial1711060033055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Auth\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`Auth\` ADD UNIQUE INDEX \`IDX_10b96a5538c04c5c9a93f33b96\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_10b96a5538c04c5c9a93f33b96\` ON \`Auth\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`Auth\` ADD CONSTRAINT \`FK_10b96a5538c04c5c9a93f33b960\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Auth\` DROP FOREIGN KEY \`FK_10b96a5538c04c5c9a93f33b960\``);
        await queryRunner.query(`DROP INDEX \`REL_10b96a5538c04c5c9a93f33b96\` ON \`Auth\``);
        await queryRunner.query(`ALTER TABLE \`Auth\` DROP INDEX \`IDX_10b96a5538c04c5c9a93f33b96\``);
        await queryRunner.query(`ALTER TABLE \`Auth\` DROP COLUMN \`userId\``);
    }

}
