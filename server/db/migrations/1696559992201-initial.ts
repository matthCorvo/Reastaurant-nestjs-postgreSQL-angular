import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1696559992201 implements MigrationInterface {
    name = 'Initial1696559992201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "adresse" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{ROLE_USER}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "food"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
    }

}
