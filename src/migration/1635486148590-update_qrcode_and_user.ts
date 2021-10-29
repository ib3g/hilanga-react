import {MigrationInterface, QueryRunner} from "typeorm";

export class updateQrcodeAndUser1635486148590 implements MigrationInterface {
    name = 'updateQrcodeAndUser1635486148590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`upadatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`delectedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`affectedAt\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`affectedAt\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`printedAt\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`printedAt\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`printedAt\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`printedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`affectedAt\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`affectedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`delectedAt\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`upadatedAt\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`slug\` varchar(255) NOT NULL`);
    }

}
