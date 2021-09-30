import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [],
  project: null,
  backlogs: [],
  sprints: [],
  currentBacklog: [],
  sprint: null,
  tasks: [],
  task: null,
  notes: [],
  note: null,
  currentNotes: [],
  currentTasks: []
})
