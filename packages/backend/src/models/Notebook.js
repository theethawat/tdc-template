import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const NotebookSchema = new Schema(
  {
    title: String,
    description: String,
    date: Date,
    project: { type: Mongoose.Types.ObjectId, ref: 'Project' },
    private: { type: Boolean, default: true },
    user: { type: Mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
NotebookSchema.pre('save', function (next) {
  next();
});

const NotebookModel = Mongoose.model('Notebook', NotebookSchema);

export default NotebookModel;
