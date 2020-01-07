import { ServiceSettingSchema } from "moleculer";
import { ObjectID } from "mongodb";
import mongoose from "mongoose";

const usersSettings: ServiceSettingSchema = {
  idField: "id",

  /*
   * Public fields
   */
  fields: [
    "id",
    "email",
    "identifier",
    "firstName",
    "lastName",
    "role",
    "services",
    "departmentId",
  ],

  /*
   * Validation schema
   */
  entityValidator: {
    email: {
      type: "object",
      props: {
        address: { type: "email", min: 5, max: 64 },
        verified: { type: "boolean" },
      },
    },
    services: {
      type: "object",
      props: {
        password: {
          type: "object",
          props: {
            bcrypt: { type: "string" },
            createdAt: { type: "date" },
          },
        },
        authToken: { type: "string" },
        validationToken: { type: "string" },
        resetToken: { type: "string", optional: true },
      },
    },
    identifier: { type: "string", min: 8, unique: true },
    firstName: { type: "string", min: 3, optional: true },
    lastName: { type: "string", min: 3, optional: true },
    departmentId: { type: "string", optional: true },
    role: {
      type: "object",
      props: {
        id: { type: "string", empty: false },
        name: { type: "string", empty: false },
      },
    },
    createdAt: { type: "date", optional: true },
    updatedAt: { type: "date", optional: true },
  },
};

export interface IUserEntity {
  _id: ObjectID;
  identifier: string;
  firstName?: string;
  lastName?: string;
  email: {
    address: string;
    verified: boolean;
  };
  services: {
    password: {
      bcrypt: string;
      createdAt: Date;
    };
    authToken: "";
    validationToken: string;
  };
  departmentId?: string;
  role: {
    id: string;
    name: string;
  };
  createdAt: Date;
}

const userSchema = mongoose.Schema({
  email: {
    address: { type: String, min: 5, max: 64, index: true, required: true },
    verified: { type: Boolean },
  },
  services: {
    password: {
      bcrypt: { type: String, required: true },
      createdAt: { type: Date },
    },
    authToken: { type: String, required: true },
    validationToken: { type: String, required: true },
    resetToken: { type: String },
  },
  identifier: { type: String, min: 8, index: true, required: true },
  firstName: { type: String, min: 3 },
  lastName: { type: String, min: 3 },
  departmentId: { type: String },
  role: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const userModel = mongoose.model("Users", userSchema);

export { usersSettings, userModel };
