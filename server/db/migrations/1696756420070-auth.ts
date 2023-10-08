import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1696756420070 implements MigrationInterface {
    name = 'Auth1696756420070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roles" TO "role"`);
        await queryRunner.query(`ALTER TYPE "public"."user_roles_enum" RENAME TO "user_role_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "roles"`);
    }

}
