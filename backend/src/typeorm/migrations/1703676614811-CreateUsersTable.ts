import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1703676614811 implements MigrationInterface {
    name = 'CreateUsersTable1703676614811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`otpFlag\` tinyint NOT NULL DEFAULT 0, \`otp\` varchar(4) NULL, \`otpRequestedAt\` datetime NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
