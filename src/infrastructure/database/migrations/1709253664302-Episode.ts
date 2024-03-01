import { MigrationInterface, QueryRunner } from "typeorm";

export class Episode1709253664302 implements MigrationInterface {
	name = "Episode1709253664302";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "Episode" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" integer NOT NULL, "url" character varying, "season" integer NOT NULL DEFAULT '1', "title" character varying, "notified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_69a2a24576672f927878466caca" PRIMARY KEY ("uuid"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "Episode"`);
	}
}
