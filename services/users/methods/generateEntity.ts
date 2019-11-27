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
const generateEntity = function(
  identifier: string,
  email: string,
  password: string,
  role: { id; name },
): IUserEntity {
  const id = new ObjectID();

  return {
    _id: id,
    identifier,
    email: {
      address: email,
      verified: false,
    },
    services: {
      password: {
        bcrypt: this.hashPassword(password),
        createdAt: new Date(),
      },
      authToken: jwt.sign(
        {
          id,
          email,
          role: role.id,
          expiresAt: moment().add(3, "m"),
        },
        process.env.JWT_SECRET,
      ),
      validationToken: uuid.v1(),
    },
    role,
    createdAt: new Date(),
  };
};

export default generateEntity;
