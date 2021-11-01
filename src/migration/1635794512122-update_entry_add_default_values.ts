import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntryAddDefaultValues1635794512122 implements MigrationInterface {
    name = 'updateEntryAddDefaultValues1635794512122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`start\` \`start\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakStart\` \`breakStart\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakEnd\` \`breakEnd\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`end\` \`end\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`end\` \`end\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakEnd\` \`breakEnd\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`breakStart\` \`breakStart\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`start\` \`start\` datetime NOT NULL`);
    }

}
