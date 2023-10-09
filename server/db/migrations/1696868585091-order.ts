import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1696868585091 implements MigrationInterface {
    name = 'Order1696868585091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orderItem" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "foodId" integer, CONSTRAINT "PK_fe5c4758e5f47a681deb1065c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('NOUVEAU', 'PAYÉ', 'EXPÉDIÉ', 'ANNULÉ', 'REMBOUR')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" "public"."order_status_enum" array NOT NULL DEFAULT '{NOUVEAU}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "adresseLatLngId" integer, "orderItemsId" integer, CONSTRAINT "REL_adc62232facb0ef6e6549d01cb" UNIQUE ("adresseLatLngId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "LatLng" ("id" SERIAL NOT NULL, CONSTRAINT "PK_6f08dce306daaca6292deced550" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orderItem" ADD CONSTRAINT "FK_fa447917863c6c63def32d20594" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_adc62232facb0ef6e6549d01cb0" FOREIGN KEY ("adresseLatLngId") REFERENCES "LatLng"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8cffdcf6c68ba3ec5af2ea91cc8" FOREIGN KEY ("orderItemsId") REFERENCES "orderItem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8cffdcf6c68ba3ec5af2ea91cc8"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_adc62232facb0ef6e6549d01cb0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "orderItem" DROP CONSTRAINT "FK_fa447917863c6c63def32d20594"`);
        await queryRunner.query(`DROP TABLE "LatLng"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "orderItem"`);
    }

}
