import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Addresses {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column()
  number?: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
