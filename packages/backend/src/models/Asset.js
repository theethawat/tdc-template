import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const AssetSchema = new Schema(
  {
    url: String,
    name: String,
    project: { type: Mongoose.Types.ObjectId, ref: 'Project' },
    type: { type: String, default: 'image' },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
AssetSchema.pre('save', function (next) {
  next();
});

const AssetModel = Mongoose.model('Asset', AssetSchema);

export default AssetModel;
