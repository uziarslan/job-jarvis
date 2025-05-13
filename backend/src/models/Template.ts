// src/features/template/template.entity.ts

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";

@Entity()
export class Template {
  @ObjectIdColumn()
  id!: ObjectId;

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

  @Column(() => ObjectId)
  userId!: ObjectId;
}
