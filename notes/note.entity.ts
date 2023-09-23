import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  content: string;

  @Column("text")
  userId: string;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "user_id" })
  user: User;
}
