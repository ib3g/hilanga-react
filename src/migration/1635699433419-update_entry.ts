import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntry1635699433419 implements MigrationInterface {
    name = 'updateEntry1635699433419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` ADD \`upadatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` ADD \`delectedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`day\` \`day\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`start\` \`start\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakStart\` \`breakStart\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakEnd\` \`breakEnd\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`end\` \`end\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`end\` \`end\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakEnd\` \`breakEnd\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakStart\` \`breakStart\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`start\` \`start\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`day\` \`day\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Entry\` DROP COLUMN \`delectedAt\``);
        await queryRunner.query(`ALTER TABLE \`Entry\` DROP COLUMN \`upadatedAt\``);
        await queryRunner.query(`ALTER TABLE \`Entry\` DROP COLUMN \`createdAt\``);
    }

}
