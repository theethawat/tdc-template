import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    start_date: Date,
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line prefer-arrow-callback
ProjectSchema.pre('save', function (next) {
  next();
});

const ProjectModel = Mongoose.model('Project', ProjectSchema);

export default ProjectModel;
