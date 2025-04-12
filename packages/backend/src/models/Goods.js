import Mongoose from "mongoose";

const { Schema } = Mongoose;

const GoodsSchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line prefer-arrow-callback
GoodsSchema.pre("save", function (next) {
  next();
});

const GoodsModel = Mongoose.model("Goods", GoodsSchema);

export default GoodsModel;
