import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685282235095 implements MigrationInterface {
    name = 'default1685282235095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "text" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "letters" ("id" SERIAL NOT NULL, "text" text NOT NULL, "sender_id" integer, "receiver_id" integer, CONSTRAINT "PK_bf70c41d26aa84cf2651d571889" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "letters" ADD CONSTRAINT "FK_6fdd7ebe67fd9d48d4370a02daa" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "letters" ADD CONSTRAINT "FK_ffad443a49fbc46769a606c3f85" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "letters" DROP CONSTRAINT "FK_ffad443a49fbc46769a606c3f85"`);
        await queryRunner.query(`ALTER TABLE "letters" DROP CONSTRAINT "FK_6fdd7ebe67fd9d48d4370a02daa"`);
        await queryRunner.query(`DROP TABLE "letters"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
