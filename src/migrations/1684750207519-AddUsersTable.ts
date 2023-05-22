import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1684750207519 implements MigrationInterface {
    name = 'AddUsersTable1684750207519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "otp" character varying, "otpExpiry" TIMESTAMP, "password" character varying, "invite" character varying, "status" "public"."User_status_enum" NOT NULL DEFAULT 'pending', "role" "public"."User_role_enum" NOT NULL, "walletAddress" character varying, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
