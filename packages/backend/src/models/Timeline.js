import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const TimelineSchema = new Schema(
  {
    title: String,
    project: { type: Mongoose.Types.ObjectId, ref: 'Project' },
    user: { type: Mongoose.Types.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
TimelineSchema.pre('save', function (next) {
  next();
});

const TimelineModel = Mongoose.model('Timeline', TimelineSchema);
export default TimelineModel;
