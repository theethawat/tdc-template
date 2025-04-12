import Mongoose from "mongoose";

const { Schema } = Mongoose;

const GoodsTypeSchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line prefer-arrow-callback
GoodsTypeSchema.pre("save", function (next) {
  next();
});

const GoodsTypeModel = Mongoose.model("GoodsType", GoodsTypeSchema);

export default GoodsTypeModel;
