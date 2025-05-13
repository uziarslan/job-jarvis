import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Template } from "./Template";
import { AIProfile } from "./AIProfile";

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @Column({ default: false })
  isPremium!: boolean;

  @Column({ type: "jsonb", nullable: true })
  stripeData?: any;

  @OneToMany(() => Template, (template) => template.user)
  templates!: Template[];

  @OneToOne(() => AIProfile, (profile) => profile.user, { cascade: true })
  aiProfile!: AIProfile;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
