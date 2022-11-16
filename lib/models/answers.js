import { Model } from "objection";

export default class Answer extends Model {
  static tableName = "answers";
  static jsonSchema = {
    type: "object",
    required: ["qid", "correct", "value"],
    properties: {
      id: { type: "integer" },
      qid: { type: "integer" },
      correct: { type: "string", minLength: 1, maxLength: 255 },
      desc: { type: "string", minLength: 1, maxLength: 255 },
    },
  };
}
