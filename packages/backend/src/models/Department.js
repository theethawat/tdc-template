import Mongoose from "mongoose";

const { Schema } = Mongoose;

const DepartmentSchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line prefer-arrow-callback
DepartmentSchema.pre("save", function (next) {
  next();
});

const DepartmentModel = Mongoose.model("Department", DepartmentSchema);

export default DepartmentModel;
