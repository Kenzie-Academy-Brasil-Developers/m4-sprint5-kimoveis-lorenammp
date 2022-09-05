import AppDataSource from "../../data-source";

import bcrypt from "bcrypt";

import { User } from "../../entities/user.entity";
import { IUserDelete } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const DeleteUserService = async ({ id }: IUserDelete) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const userById = users.find((user) => user.id === id);

  if (!userById) {
    throw new AppError(404, "User id does not exists");
  }

  if (!userById.isActive) {
    throw new AppError(400, "User is already innactive");
  }

  userById.isActive = false;

  await userRepository.save(userById);

  const updatedUser = (({
    id,
    name,
    email,
    isAdm,
    isActive,
    updatedAt,
    createdAt,
  }) => ({
    id,
    name,
    email,
    isAdm,
    isActive,
    updatedAt,
    createdAt,
  }))(userById);

  return updatedUser;
};

export default DeleteUserService;
