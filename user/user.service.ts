import { User } from "./user.entity";
import { AppDataSource } from "../datasource";
import NotFoundError from "../error/http-error-not-found";
import { FindUserByIdParamsDto } from "./dto/find-user-by-id.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ErrorMessages } from "../error/messages.enum";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async findUserById({ id }: FindUserByIdParamsDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found!`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async deleteUserById(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found!`);
    }

    await this.userRepository.delete(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found!`);
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async updatePersonalData(
    userEmail: string,
    updateUserDto: UpdateUserDto
  ): Promise<void> {
    const userToUpdate = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (!userToUpdate) {
      throw new NotFoundError(ErrorMessages.UserNotFound);
    }

    if (updateUserDto.firstName) {
      userToUpdate.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      userToUpdate.lastName = updateUserDto.lastName;
    }

    await this.userRepository.save(userToUpdate);
  }

  async getUserPersonalData(userEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new NotFoundError(ErrorMessages.UserNotFound);
    }

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError(ErrorMessages.UserNotFound);
    }

    return user;
  }
}
