import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { User } from "./user/user.entity";
import { Note } from "./notes/note.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "nastya",
  password: "12345678",
  database: "nastyadb",
  synchronize: true,
  logging: false,
  entities: [User, Note],
  namingStrategy: new SnakeNamingStrategy(),
});
