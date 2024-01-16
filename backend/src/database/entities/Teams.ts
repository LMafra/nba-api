import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  abbreviation: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
