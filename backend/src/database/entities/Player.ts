import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Player {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	number: string;

	@Column()
	height: string;

	@Column()
	weight: string;

	@Column()
	team: string;

	@Column()
	position: string;

	@Column()
	country: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
