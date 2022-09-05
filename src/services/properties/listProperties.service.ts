import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const ListPropertiesService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const propertyList = await propertiesRepository.find();

  return propertyList;
};

export default ListPropertiesService;
