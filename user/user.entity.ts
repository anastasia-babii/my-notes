import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";

const saltRounds = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text", { unique: true })
  phone: string;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column({ type: "varchar", length: 255 })
  password: string;
}
