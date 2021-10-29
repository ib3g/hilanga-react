import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserAddBirthday1635466446673 implements MigrationInterface {
    name = 'updateUserAddBirthday1635466446673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`birthDay\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`birthDay\``);
    }

}
