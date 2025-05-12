import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity()
@Unique(["user"])
export class AIProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  summary!: string;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User, (user) => user.aiProfile, { onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;
}
