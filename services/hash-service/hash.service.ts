import bcrypt from "bcrypt";
import { CompareHashesArgs } from "../../types/interfaces";

export class HashService {
  private readonly saltRounds = 10;
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  //Arguments as object with interface +
  async compareHashes(args: CompareHashesArgs): Promise<boolean> {
    return bcrypt.compare(args.password, args.hashedPassword);
  }
}
