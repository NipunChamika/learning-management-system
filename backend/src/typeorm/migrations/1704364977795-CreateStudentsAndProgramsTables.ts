import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentsAndProgramsTables1704364977795 implements MigrationInterface {
    name = 'CreateStudentsAndProgramsTables1704364977795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`passedAL\` tinyint NOT NULL, \`userId\` int NULL, \`programId\` int NULL, UNIQUE INDEX \`REL_e0208b4f964e609959aff431bf\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`programs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`programName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_e0208b4f964e609959aff431bf9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_00e43a3c44216514044bac1e675\` FOREIGN KEY (\`programId\`) REFERENCES \`programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_00e43a3c44216514044bac1e675\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_e0208b4f964e609959aff431bf9\``);
        await queryRunner.query(`DROP TABLE \`programs\``);
        await queryRunner.query(`DROP INDEX \`REL_e0208b4f964e609959aff431bf\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
    }

}
