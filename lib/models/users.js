import { Model } from "objection";
import UserCourse from "./users_courses.js";
export default class User extends Model {
  static tableName = "users";
  static jsonSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
      id: { type: "integer" },
      username: { type: "string", minLength: 1, maxLength: 255 },
      password: { type: "string", minLength: 1, maxLength: 255 },
      rtoken: { type: ["string", "null"], minLength: 1, maxLength: 255 },
    },
  };
  static get relationMappings() {
    return {
      userCourse: {
        relation: Model.HasManyRelation,
        modelClass: UserCourse,
        join: {
          from: "users.id",
          to: "userCourse.uid",
        },
      },
    };
  }
}
