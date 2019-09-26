import { Errors } from "moleculer";
import { IUserEntity } from "../settings";

/**
 * Inserts a User document to the database
 *
 * @param {object} service Reference to the Users service
 * @param {IUserEntity} entity A User document object
 * @returns {IUserEntity}
 */
const insertUser = async (service, entity: IUserEntity) => {
  try {
    return await service.adapter.insert(entity);
  } catch (error) {
    return Promise.reject(
      new Errors.MoleculerServerError(
        `Insert operation failed: ${error.message}`,
        500,
        "InsertFailed",
      ),
    );
  }
};

export default insertUser;
