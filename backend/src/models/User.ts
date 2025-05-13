import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: number;

  @Column({ default: false })
  isPremium!: boolean;

  @Column({ type: "jsonb", nullable: true })
  stripeData?: any;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
