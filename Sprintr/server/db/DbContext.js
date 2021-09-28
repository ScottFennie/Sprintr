import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BacklogItemSchema } from '../models/BacklogItem'
import { NoteSchema } from '../models/Note'
import { ProjectSchema } from '../models/Project'
import { SprintSchema } from '../models/Sprint'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema)

  Sprints = mongoose.model('Sprints', SprintSchema)

  BacklogItems = mongoose.model('BacklogItems', BacklogItemSchema)

  Tasks = mongoose.model('Tasks', TaskSchema)

  Notes = mongoose.model('Notes', NoteSchema)
}

export const dbContext = new DbContext()
