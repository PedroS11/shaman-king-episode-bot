import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimaryIds1706218700194 implements MigrationInterface {
	name = "PrimaryIds1706218700194";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" DROP CONSTRAINT "PK_c61e604db606b512a70c676a5f1"`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD CONSTRAINT "PK_d8c01ab4be6f79e27b780e00b6d" PRIMARY KEY ("id", "uuid")`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" DROP CONSTRAINT "PK_d8c01ab4be6f79e27b780e00b6d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD CONSTRAINT "PK_69a2a24576672f927878466caca" PRIMARY KEY ("uuid")`,
		);
		await queryRunner.query(`ALTER TABLE "Episode" DROP COLUMN "season"`);
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD "season" integer NOT NULL DEFAULT '1'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "Episode" DROP COLUMN "season"`);
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD "season" character varying NOT NULL DEFAULT '1'`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" DROP CONSTRAINT "PK_69a2a24576672f927878466caca"`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD CONSTRAINT "PK_d8c01ab4be6f79e27b780e00b6d" PRIMARY KEY ("id", "uuid")`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" DROP CONSTRAINT "PK_d8c01ab4be6f79e27b780e00b6d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "Episode" ADD CONSTRAINT "PK_c61e604db606b512a70c676a5f1" PRIMARY KEY ("id")`,
		);
		await queryRunner.query(`ALTER TABLE "Episode" DROP COLUMN "uuid"`);
	}
}
