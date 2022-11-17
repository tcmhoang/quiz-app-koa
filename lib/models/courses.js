import { Model } from "objection";
import Quiz from "./quizzes.js";
import UserCourse from "./users_courses.js";
export default class Course extends Model {
  static tableName = "courses";
  static jsonSchema = {
    type: "object",
    required: ["title"],
    properties: {
      id: { type: "integer" },
      title: { type: "string", minLength: 1, maxLength: 255 },
    },
  };
  static get relationMappings() {
    return {
      quizzes: {
        relation: Model.HasManyRelation,
        modelClass: Quiz,
        join: {
          from: "courses.id",
          to: "quizzes.cid",
        },
      },
      userCourse: {
        relation: Model.HasManyRelation,
        modelClass: UserCourse,
        join: {
          from: "courses.id",
          to: "userCourse.cid",
        },
      },
    };
  }
}
