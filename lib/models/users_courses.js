import { Model } from "objection";
import Course from "./courses.js";
import User from "./users.js";
export default class UserCourse extends Model {
  static tableName = "userCourse";
  static jsonSchema = {
    type: "object",
    required: ["uid", "cid"],
    properties: {
      cid: { type: "integer" },
      uid: { type: "integer" },
    },
  };

  static relationMappings = {
    user: {
      relation: Model.HasOne,
      modelClass: User,
      join: {
        from: "userCourse.uid",
        to: "user.id",
      },
    },
    platform: {
      relation: Model.HasOne,
      modelClass: Course,
      join: {
        from: "userCourse.cid",
        to: "courses.id",
      },
    },
  };
}
