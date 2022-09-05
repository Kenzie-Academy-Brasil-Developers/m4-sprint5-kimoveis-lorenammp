import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedules {
  @PrimaryColumn("uuid")
  readonly id: string;

  // @OneToMany((type) => User, (user) => user.schedule, {
  //   eager: true,
  // })
  // user: User[];
  // userId: User;

  // @OneToMany((type) => Properties, (property) => property.schedule, {
  //   eager: true,
  // })
  // property: Properties[];
  // propertyId: Properties;

  @ManyToOne((type) => User, (user) => user.schedule, {
    eager: true,
  })
  user: User;

  @ManyToOne((type) => Properties, (property) => property.schedule, {
    eager: true,
  })
  property: Properties;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
