import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntryDay1635792722800 implements MigrationInterface {
    name = 'updateEntryDay1635792722800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`day\` \`day\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Entry\` CHANGE \`day\` \`day\` datetime(0) NOT NULL`);
    }

}
