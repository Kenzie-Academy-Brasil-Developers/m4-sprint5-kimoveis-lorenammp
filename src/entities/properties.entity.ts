import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";

@Entity()
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Categories, (category) => category.properties)
  category: Categories;

  @OneToOne((type) => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany((type) => Schedules, (schedule) => schedule.property)
  schedule: Properties[];

  @Column({ default: false })
  sold: boolean;

  @Column("float")
  value: number;

  @Column("integer")
  size: number;

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
