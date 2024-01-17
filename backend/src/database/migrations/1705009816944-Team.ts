import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Team1705009816944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table ({
            name: "teams",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
              },
              {
                name: "abbreviation",
                type: "varchar",
              },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "location",
                type: "varchar",
              },
              {
                name: "createdAt",
                type: "timestamp",
                default: "now()",
              },
              {
                name: "updatedAt",
                type: "timestamp",
                default: "now()",
              },
            ]
          })
        )
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teams");
      }
}
