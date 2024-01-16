import { MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class Player1705346987456 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "players",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "number",
						type: "int",
					},
					{
						name: "height",
						type: "int",
					},
					{
						name: "weight",
						type: "int",
					},
					{
						name: "team",
						type: "varchar",
					},
					{
						name: "position",
						type: "varchar",
					},
					{
						name: "country",
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
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("players");
	}
}
