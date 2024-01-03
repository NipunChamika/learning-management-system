import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProgramsTable1704265054904 implements MigrationInterface {
    name = 'CreateProgramsTable1704265054904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`programs\` (\`programId\` int NOT NULL AUTO_INCREMENT, \`programName\` varchar(255) NOT NULL, PRIMARY KEY (\`programId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD \`programId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_00e43a3c44216514044bac1e675\` FOREIGN KEY (\`programId\`) REFERENCES \`programs\`(\`programId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_00e43a3c44216514044bac1e675\``);
        await queryRunner.query(`ALTER TABLE \`students\` DROP COLUMN \`programId\``);
        await queryRunner.query(`DROP TABLE \`programs\``);
    }

}
