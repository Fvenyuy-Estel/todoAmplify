import Todos from '../views/Todos.vue'
import Home from '../views/Home.vue'
import { createWebHistory, createRouter } from 'vue-router';
import SignUpPage from '../views/SignUpPage';
import NewTodoPage from '../views/NewTodoPage'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/signup",
    name:"signUpPage",
    component:SignUpPage
  },
  {
    path:"/todos",
    name:"Todos",
    component:Todos
  },{
    path:"/create-todo",
    name:"Creat-Todo",
    component: NewTodoPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router