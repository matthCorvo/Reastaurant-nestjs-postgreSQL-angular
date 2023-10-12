import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697054640300 implements MigrationInterface {
    name = 'Init1697054640300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_373595db25127ead860b4499466"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderedProductsId"`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TYPE "public"."orders_status_enum" RENAME TO "orders_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('NOUVEAU', 'PAYÉ', 'EXPÉDIÉ', 'ANNULÉ', 'REMBOURSÉ')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" TYPE "public"."orders_status_enum"[] USING "status"::"text"::"public"."orders_status_enum"[]`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT '{NOUVEAU}'`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_823bad3524a5d095453c43286bb" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_823bad3524a5d095453c43286bb"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum_old" AS ENUM('NOUVEAU', 'PAYÉ', 'EXPÉDIÉ', 'ANNULÉ', 'REMBOUR')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" TYPE "public"."orders_status_enum_old"[] USING "status"::"text"::"public"."orders_status_enum_old"[]`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT '{NOUVEAU}'`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_status_enum_old" RENAME TO "orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderedProductsId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_373595db25127ead860b4499466" FOREIGN KEY ("orderedProductsId") REFERENCES "orders_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
