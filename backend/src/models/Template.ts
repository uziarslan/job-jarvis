// src/features/template/template.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.templates, {
    onDelete: "CASCADE",
  })
  user!: User;
}
