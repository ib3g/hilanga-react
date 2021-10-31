import {MigrationInterface, QueryRunner} from "typeorm";

export class updateQrcodeChangeStringToLongText1635697432703 implements MigrationInterface {
    name = 'updateQrcodeChangeStringToLongText1635697432703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c5523c70cedb25980fe8eddb0f\` ON \`QrCode\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`qrcodeImgUrl\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`qrcodeImgUrl\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP COLUMN \`qrcodeImgUrl\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD \`qrcodeImgUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c5523c70cedb25980fe8eddb0f\` ON \`QrCode\` (\`ownerId\`)`);
    }

}
