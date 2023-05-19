const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-errors");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    // in sequelize while deleting the resource
    // if resource found and deleted successfully the it return 1  (response = 1)
    // if resource not found the it return 0 (response = 0)
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });

    if (!response) {
      throw new AppError(
        "resource you are trying to delete is not present",
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  }

  async get(data) {
    // if resource you are trying to fetch is not present then it resturns (null)
    // otherwise return that object
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(
        "not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    // data is object --> {col: value, ........}
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = CrudRepository;
