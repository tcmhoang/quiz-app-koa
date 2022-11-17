import { Model } from "objection";
import Answer from "./answers.js";
import Question from "./questions.js";

export default class QuestionAnswer extends Model {
  static tableName = "questionAnswer";
  static jsonSchema = {
    type: "object",
    required: ["qid", "aid"],
    properties: {
      qid: { type: "integer" },
      aid: { type: "integer" },
    },
  };

  static relationMappings = {
    user: {
      relation: Model.HasOne,
      modelClass: Answer,
      join: {
        from: "questionAnswer.aid",
        to: "answers.id",
      },
    },
    platform: {
      relation: Model.HasOne,
      modelClass: Question,
      join: {
        from: "questionAnswer.qid",
        to: "questions.id",
      },
    },
  };
}
