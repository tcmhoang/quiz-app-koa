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

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasOne,
        modelClass: User,
        join: {
          from: "userCourse.uid",
          to: "user.id",
        },
      },
      courses: {
        relation: Model.HasOne,
        modelClass: Course,
        join: {
          from: "userCourse.cid",
          to: "courses.id",
        },
      },
    };
  }
}
