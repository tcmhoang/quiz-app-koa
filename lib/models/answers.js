import { Model } from "objection";

export default class Answer extends Model {
  static tableName = "answers";
  static jsonSchema = {
    type: "object",
    required: ["qid", "desc", "correct"],
    properties: {
      id: { type: "integer" },
      desc: { type: "string", minLength: 1, maxLength: 255 },
      correct: { type: "boolean" },
    },
  };
}
