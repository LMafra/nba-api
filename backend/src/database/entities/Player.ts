import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  

  @Column()
  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
