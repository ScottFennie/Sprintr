import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  backlogItemId: { type: Schema.Types.ObjectId, required: true, ref: 'BacklogItem' },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('backlogitems', {
  localField: 'backlogItemId',
  foreignField: '_id',
  justOne: true,
  ref: 'BacklogItem'
})
TaskSchema.virtual('projects', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
