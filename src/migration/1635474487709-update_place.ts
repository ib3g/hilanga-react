import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePlace1635474487709 implements MigrationInterface {
    name = 'updatePlace1635474487709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Place\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Place\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Place\` ADD \`upadatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Place\` ADD \`delectedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`start\` \`start\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`breakStart\` \`breakStart\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`breakEnd\` \`breakEnd\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`end\` \`end\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`end\` \`end\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`breakEnd\` \`breakEnd\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`breakStart\` \`breakStart\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Place\` CHANGE \`start\` \`start\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Place\` DROP COLUMN \`delectedAt\``);
        await queryRunner.query(`ALTER TABLE \`Place\` DROP COLUMN \`upadatedAt\``);
        await queryRunner.query(`ALTER TABLE \`Place\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`Place\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
