import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('projects', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
