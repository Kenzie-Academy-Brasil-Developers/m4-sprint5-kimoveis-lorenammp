import AppDataSource from "../../data-source";

import bcrypt from "bcrypt";

import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";
import { Properties } from "../../entities/properties.entity";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";

const CreatePropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const addresses = await addressRepository.find();

  const propertyList = addresses.map(
    ({ district, zipCode, number, city, state }) => ({
      district,
      zipCode,
      number,
      city,
      state,
    })
  );

  const checkAddress = propertyList.find(
    (addressObj) =>
      Object.entries(addressObj).toString() ===
      Object.entries(address).toString()
  );

  if (checkAddress) {
    throw new AppError(
      400,
      "This address is already associated with another property"
    );
  }

  const categories = await categoryRepository.find();
  const propertyCategory = categories.find((cat) => cat.id === categoryId);

  if (!propertyCategory) {
    throw new AppError(404, "Invalid category id");
  }

  const newAddress = new Addresses();

  newAddress.district = address.district;
  newAddress.zipCode = address.zipCode;
  newAddress.number = address.number;
  newAddress.city = address.city;
  newAddress.state = address.state;

  addressRepository.create(newAddress);
  await addressRepository.save(newAddress);

  const date = new Date();

  const property = new Properties();

  property.value = value;
  property.size = size;
  property.address = newAddress;
  property.category = propertyCategory;
  property.createdAt = date;
  property.updatedAt = date;

  propertyRepository.create(property);
  await propertyRepository.save(property);

  return property;
};

export default CreatePropertyService;
