import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  title!: string;

  @Column("text")
  description!: string;

  @Column({ nullable: true })
  budget?: string;

  @Column({ nullable: true })
  duration?: string;

  @Column()
  location!: string;

  @Column()
  postedAt!: string;

  @Column("simple-array")
  skills!: string[];

  @Column()
  jobType!: string;

  @Column()
  contractorTier!: string;

  @Column()
  proposals!: string;

  @Column("jsonb")
  clientInfo!: {
    rating?: string;
    totalSpent?: string;
    jobsPosted?: string;
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
