import AppDataSource from "../../data-source";

import { ICategoryRequest } from "../../interfaces/categories";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const CreateCategoryService = async ({ name }: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const categories = await categoryRepository.find();
  const checkCategory = categories.find((category) => category.name === name);

  if (checkCategory) {
    throw new AppError(400, "Category already exists");
  }

  const category = new Categories();

  category.name = name;

  categoryRepository.create(category);
  await categoryRepository.save(category);

  return category;
};

export default CreateCategoryService;
