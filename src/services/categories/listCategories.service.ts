import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const ListCategoriesService = async () => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryList = await categoryRepository.find();

  return categoryList;
};

export default ListCategoriesService;
