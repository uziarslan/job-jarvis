import {
  Entity,
  Column,
  UpdateDateColumn,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";

@Entity()
export class AIProfile {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  title!: string;

  @Column("text")
  summary!: string;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column(() => ObjectId)
  userId!: ObjectId;
}
