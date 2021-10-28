import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigrations1635454593190 implements MigrationInterface {
    name = 'FirstMigrations1635454593190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`QrCode\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`qrcode\` varchar(255) NOT NULL, \`qrcodeImgUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`affectedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`printedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Place\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`start\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`breakStart\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`breakEnd\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`end\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`managerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`upadatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delectedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` text NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`managerId\` int NULL, UNIQUE INDEX \`IDX_f0444b8b5c111257c300932ae0\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Entry\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`start\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`breakStart\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`breakEnd\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`end\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`placeId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`QrCode\` ADD CONSTRAINT \`FK_a1288ac10fc41c6fff71f400d6e\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Place\` ADD CONSTRAINT \`FK_39672922e4b647ef125f28d5055\` FOREIGN KEY (\`managerId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_e77237e05623c958c9aa13e9a84\` FOREIGN KEY (\`managerId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Entry\` ADD CONSTRAINT \`FK_97755619e45c78a0e8b44f943b1\` FOREIGN KEY (\`placeId\`) REFERENCES \`Place\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Entry\` ADD CONSTRAINT \`FK_3d19c6de5dd40ceabdf6c8d199e\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` DROP FOREIGN KEY \`FK_3d19c6de5dd40ceabdf6c8d199e\``);
        await queryRunner.query(`ALTER TABLE \`Entry\` DROP FOREIGN KEY \`FK_97755619e45c78a0e8b44f943b1\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_e77237e05623c958c9aa13e9a84\``);
        await queryRunner.query(`ALTER TABLE \`Place\` DROP FOREIGN KEY \`FK_39672922e4b647ef125f28d5055\``);
        await queryRunner.query(`ALTER TABLE \`QrCode\` DROP FOREIGN KEY \`FK_a1288ac10fc41c6fff71f400d6e\``);
        await queryRunner.query(`DROP TABLE \`Entry\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0444b8b5c111257c300932ae0\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Place\``);
        await queryRunner.query(`DROP TABLE \`QrCode\``);
    }

}
