import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const ListUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userList = users.map(
    ({ id, name, email, isAdm, isActive, updatedAt, createdAt }) => ({
      id,
      name,
      email,
      isAdm,
      isActive,
      updatedAt,
      createdAt,
    })
  );

  return userList;
};

export default ListUsersService;
