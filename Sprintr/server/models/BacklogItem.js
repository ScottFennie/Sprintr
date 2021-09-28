import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

export const BacklogItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, Enum: ['pending', 'in-progress', 'review', 'done'] },
  sprintId: { type: Schema.Types.ObjectId, required: true, ref: 'Sprint' },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

BacklogItemSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  justOne: true,
  ref: 'Sprint'
})
BacklogItemSchema.virtual('projects', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
BacklogItemSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
