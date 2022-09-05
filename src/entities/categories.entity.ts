import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";

@Entity()
export class Categories {
  @PrimaryColumn("uuid")
  readonly id: string;

  @OneToMany((type) => Properties, (property) => property.category, {
    eager: true,
  })
  properties: Properties[];

  @Column({ unique: true })
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
