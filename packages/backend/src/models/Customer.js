import Mongoose from "mongoose";

const { Schema } = Mongoose;

const CustomerSchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line prefer-arrow-callback
CustomerSchema.pre("save", function (next) {
  next();
});

const CustomerModel = Mongoose.model("Customer", CustomerSchema);

export default CustomerModel;
