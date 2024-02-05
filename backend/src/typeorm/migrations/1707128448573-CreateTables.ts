import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1707128448573 implements MigrationInterface {
    name = 'CreateTables1707128448573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`otpFlag\` tinyint NOT NULL DEFAULT 0, \`otp\` varchar(4) NULL, \`otpRequestedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`passedAL\` tinyint NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_e0208b4f964e609959aff431bf\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`programs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`programCode\` varchar(255) NOT NULL, \`programName\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_597c41639eb97f5bc1e45cdfb2\` (\`programCode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`learning_materials\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`learningMaterialTitle\` varchar(255) NOT NULL, \`materialType\` varchar(255) NOT NULL, \`resourcePath\` varchar(255) NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`courseCode\` varchar(255) NOT NULL, \`courseName\` varchar(255) NOT NULL, \`programId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`assignments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`assignmentTitle\` varchar(255) NOT NULL, \`resourcePath\` varchar(255) NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_programs\` (\`studentsId\` int NOT NULL, \`programsId\` int NOT NULL, INDEX \`IDX_8e7bc62fb2469b5ff770456804\` (\`studentsId\`), INDEX \`IDX_0a1b465d6812a33b896ebf2525\` (\`programsId\`), PRIMARY KEY (\`studentsId\`, \`programsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_e0208b4f964e609959aff431bf9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`learning_materials\` ADD CONSTRAINT \`FK_485fe40498ebc8af8282707d724\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_03c90f3dd15434f79d8a87ec8db\` FOREIGN KEY (\`programId\`) REFERENCES \`programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assignments\` ADD CONSTRAINT \`FK_9e5684667ea189ade0fc79fa4f1\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_programs\` ADD CONSTRAINT \`FK_8e7bc62fb2469b5ff770456804d\` FOREIGN KEY (\`studentsId\`) REFERENCES \`students\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`student_programs\` ADD CONSTRAINT \`FK_0a1b465d6812a33b896ebf2525f\` FOREIGN KEY (\`programsId\`) REFERENCES \`programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_programs\` DROP FOREIGN KEY \`FK_0a1b465d6812a33b896ebf2525f\``);
        await queryRunner.query(`ALTER TABLE \`student_programs\` DROP FOREIGN KEY \`FK_8e7bc62fb2469b5ff770456804d\``);
        await queryRunner.query(`ALTER TABLE \`assignments\` DROP FOREIGN KEY \`FK_9e5684667ea189ade0fc79fa4f1\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_03c90f3dd15434f79d8a87ec8db\``);
        await queryRunner.query(`ALTER TABLE \`learning_materials\` DROP FOREIGN KEY \`FK_485fe40498ebc8af8282707d724\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_e0208b4f964e609959aff431bf9\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a1b465d6812a33b896ebf2525\` ON \`student_programs\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e7bc62fb2469b5ff770456804\` ON \`student_programs\``);
        await queryRunner.query(`DROP TABLE \`student_programs\``);
        await queryRunner.query(`DROP TABLE \`assignments\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`learning_materials\``);
        await queryRunner.query(`DROP INDEX \`IDX_597c41639eb97f5bc1e45cdfb2\` ON \`programs\``);
        await queryRunner.query(`DROP TABLE \`programs\``);
        await queryRunner.query(`DROP INDEX \`REL_e0208b4f964e609959aff431bf\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
