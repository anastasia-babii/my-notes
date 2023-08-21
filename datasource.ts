import { DataSource } from "typeorm";
import { User } from "./user/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "nastya",
  password: "12345678",
  database: "nastyadb",
  synchronize: true,
  logging: false,
  entities: [User],
});
