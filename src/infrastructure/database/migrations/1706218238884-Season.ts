import { MigrationInterface, QueryRunner } from "typeorm";

export class Season1706218238884 implements MigrationInterface {
	name = "Season1706218238884";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD "season" character varying NOT NULL DEFAULT '1'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "Episode" DROP COLUMN "season"`);
	}
}
