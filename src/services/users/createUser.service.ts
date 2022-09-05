import AppDataSource from "../../data-source";

import bcrypt from "bcrypt";

import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const CreateUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const checkEmail = users.find((user) => user.email === email);

  if (checkEmail) {
    throw new AppError(400, "Email already exists");
  }

  const date = new Date();

  const user = new User();

  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.isAdm = isAdm;
  user.updatedAt = date;
  user.createdAt = date;

  userRepository.create(user);
  await userRepository.save(user);

  const newUser = (({
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
  }))(user);

  return newUser;
};

export default CreateUserService;
