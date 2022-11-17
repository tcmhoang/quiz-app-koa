import { Model } from "objection";

export default class Question extends Model {
  static tableName = "questions";
  static jsonSchema = {
    type: "object",
    required: ["qid", "desc"],
    properties: {
      id: { type: "integer" },
      qid: { type: "integer" },
      desc: { type: "string", minLength: 1, maxLength: 255 },
    },
  };
}
