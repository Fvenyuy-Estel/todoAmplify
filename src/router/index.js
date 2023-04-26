import Todos from '../views/Todos.vue'
import EditTodo from '../views/EditTodo.vue'
import Home from '../views/Home.vue'
import { createWebHistory, createRouter } from 'vue-router';
import SignUpPage from '../views/SignUpPage.vue';
import CreateTodo from '../views/CreateTodo.vue'
// import NewTodoPage from '../views/NewTodoPage'
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
  },
  {
    path:"/edit-todo",
    name:"edit",
    component:EditTodo,
    props:{name:"heejk", description:"hei"}
  },
{
    path:"/create-todo",
    name:"Creat-Todo",
    component: CreateTodo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router