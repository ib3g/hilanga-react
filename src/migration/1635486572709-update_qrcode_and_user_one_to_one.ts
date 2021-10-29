import {MigrationInterface, QueryRunner} from "typeorm";

export class updateQrcodeAndUserOneToOne1635486572709 implements MigrationInterface {
    name = 'updateQrcodeAndUserOneToOne1635486572709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP FOREIGN KEY \`FK_a1288ac10fc41c6fff71f400d6e\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` CHANGE \`userId\` \`ownerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD UNIQUE INDEX \`IDX_c5523c70cedb25980fe8eddb0f\` (\`ownerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c5523c70cedb25980fe8eddb0f\` ON \`QrCode\` (\`ownerId\`)`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD CONSTRAINT \`FK_c5523c70cedb25980fe8eddb0f6\` FOREIGN KEY (\`ownerId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP FOREIGN KEY \`FK_c5523c70cedb25980fe8eddb0f6\``);
        await queryRunner.query(`DROP INDEX \`REL_c5523c70cedb25980fe8eddb0f\` ON \`QrCode\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP INDEX \`IDX_c5523c70cedb25980fe8eddb0f\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` CHANGE \`ownerId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD CONSTRAINT \`FK_a1288ac10fc41c6fff71f400d6e\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
