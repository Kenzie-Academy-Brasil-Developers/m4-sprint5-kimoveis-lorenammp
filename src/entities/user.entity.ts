import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Schedules } from "./schedules.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @OneToMany((type) => Schedules, (schedule) => schedule.user, {
    eager: true,
  })
  schedule: User[];

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
