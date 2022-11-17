import { Model } from "objection";
export default class Announcements extends Model {
  static tableName = "annoucements";
  static jsonSchema = {
    type: "object",
    required: ["title", "desc"],
    properties: {
      id: { type: "integer" },
      title: { type: "string", minLength: 1, maxLength: 255 },
      desc: { type: "string", minLength: 1, maxLength: 255 },
    },
  };
}
