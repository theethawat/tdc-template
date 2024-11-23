import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const LockbookListSchema = new Schema(
  {
    title: String,
    description: String,
    date: Date,
    project: { type: Mongoose.Types.ObjectId, ref: 'Project' },
    private: { type: Boolean, default: false },
    user: { type: Mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
LockbookListSchema.pre('save', function (next) {
  next();
});

const LockbookListModel = Mongoose.model('LockbookList', LockbookListSchema);

export default LockbookListModel;
