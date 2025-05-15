import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from "typeorm";

@Entity("jobs")
export class Job {
  @ObjectIdColumn()
  id!: string;

  @Column({ unique: true })
  upworkId!: string;

  @Column()
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
    paymentVerified?: string;
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
