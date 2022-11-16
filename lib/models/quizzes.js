import { Model } from "objection";
import Answer from "./answers.js";
export default class Quiz extends Model {
  static tableName = "quizzes";
  static jsonSchema = {
    type: "object",
    required: ["cid", "value"],
    properties: {
      id: { type: "integer" },
      cid: { type: "integer" },
      value: { type: "string", minLength: 1, maxLength: 255 },
    },
  };
  static relationMappings = {
    answers: {
      relation: Model.HasManyRelation,
      modelClass: Answer,
      join: {
        from: "quizzes.id",
        to: "answers.qid",
      },
    },
  };
}
