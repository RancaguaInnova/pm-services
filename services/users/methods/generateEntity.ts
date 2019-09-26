import jwt from "jsonwebtoken";
import moment from "moment";
import { ObjectID } from "mongodb";
import uuid from "uuid";
import { IUserEntity } from "../settings";

/**
 * Creates a basic User entity Document
 *
 * @param {object} service Reference to the Users service
 * @param {string} identifier Users identifier (RUT)
 * @param {string} email
 * @param {string} password
 * @returns {IUserEntity} The basic User document
 */
const generateEntity = (service, identifier: string, email: string, password: string): IUserEntity =>  {
  const id = new ObjectID();
  const activityReporterRoleId = "5d7a5c277e5a622c30ad3e3a";
  return {
    _id: id,
    identifier,
    email: {
      address: email,
      verified: false,
    },
    services: {
      password: {
        bcrypt: service.hashPassword(password),
        createdAt: new Date(),
      },
      authToken: jwt.sign({
        id,
        email,
        role: activityReporterRoleId,
        expiresAt: moment().add(3, "m"),
      }, process.env.JWT_SECRET),
      validationToken: uuid.v1(),
    },
    role: {
      id: activityReporterRoleId,
      name: "Activity Reporter",
    },
    createdAt: new Date(),
  };
};

export default generateEntity;
