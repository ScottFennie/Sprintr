import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/projects/:projectsId',
    name: 'Projects',
    component: loadPage('ProjectsPage'),
    children: [
      {
        path: 'backlog',
        name: 'Projects.Backlog',
        component: loadPage('ProjectsBacklogPage')
      },
      {
        path: 'sprint',
        name: 'Projects.Sprint',
        component: loadPage('ProjectsSprintPage')
      }
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
