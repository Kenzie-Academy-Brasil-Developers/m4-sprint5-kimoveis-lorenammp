import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const ListCategoriesPropertiesService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryList = await categoryRepository.find();
  const properties = categoryList.find((category) => category.id === id);

  if (!properties) {
    throw new AppError(404, "Invalid category id");
  }
  return properties;
};

export default ListCategoriesPropertiesService;
