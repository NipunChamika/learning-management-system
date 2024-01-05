import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndStudentsAndProgramsTables1704429191144 implements MigrationInterface {
    name = 'CreateUsersAndStudentsAndProgramsTables1704429191144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`otpFlag\` tinyint NOT NULL DEFAULT 0, \`otp\` varchar(4) NULL, \`otpRequestedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`passedAL\` tinyint NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_e0208b4f964e609959aff431bf\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`programs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`programName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_programs\` (\`studentsId\` int NOT NULL, \`programsId\` int NOT NULL, INDEX \`IDX_8e7bc62fb2469b5ff770456804\` (\`studentsId\`), INDEX \`IDX_0a1b465d6812a33b896ebf2525\` (\`programsId\`), PRIMARY KEY (\`studentsId\`, \`programsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_e0208b4f964e609959aff431bf9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_programs\` ADD CONSTRAINT \`FK_8e7bc62fb2469b5ff770456804d\` FOREIGN KEY (\`studentsId\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`student_programs\` ADD CONSTRAINT \`FK_0a1b465d6812a33b896ebf2525f\` FOREIGN KEY (\`programsId\`) REFERENCES \`programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_programs\` DROP FOREIGN KEY \`FK_0a1b465d6812a33b896ebf2525f\``);
        await queryRunner.query(`ALTER TABLE \`student_programs\` DROP FOREIGN KEY \`FK_8e7bc62fb2469b5ff770456804d\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_e0208b4f964e609959aff431bf9\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a1b465d6812a33b896ebf2525\` ON \`student_programs\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e7bc62fb2469b5ff770456804\` ON \`student_programs\``);
        await queryRunner.query(`DROP TABLE \`student_programs\``);
        await queryRunner.query(`DROP TABLE \`programs\``);
        await queryRunner.query(`DROP INDEX \`REL_e0208b4f964e609959aff431bf\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
