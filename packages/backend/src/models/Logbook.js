import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const LogbookSchema = new Schema(
  {
    description: String,
    date: Date,
    project: { type: Mongoose.Types.ObjectId, ref: 'Project' },
    private: { type: Boolean, default: false },
    user: { type: Mongoose.Types.ObjectId, ref: 'User' },
    attached_notebook: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'Notebook',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
LogbookSchema.pre('save', function (next) {
  next();
});

const LogBookModel = Mongoose.model('LogBook', LogbookSchema);

export default LogBookModel;
