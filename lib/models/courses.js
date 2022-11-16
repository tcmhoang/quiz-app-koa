import { Model } from "objection";
import Quiz from "./quizzes.js";
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
  static relationMappings = {
    animals: {
      relation: Model.HasManyRelation,
      modelClass: Quiz,
      join: {
        from: "courses.id",
        to: "quizzes.cid",
      },
    },
  };
}
