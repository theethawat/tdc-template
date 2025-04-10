import Mongoose from "mongoose";

const { Schema } = Mongoose;

const {{modelName}}Schema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line prefer-arrow-callback
{{modelName}}Schema.pre("save", function (next) {
  next();
});

const {{modelName}}Model = Mongoose.model("{{modelName}}", {{modelName}}Schema);

export default {{modelName}}Model;
