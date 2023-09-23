import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Note } from "../notes/note.entity";

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

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
