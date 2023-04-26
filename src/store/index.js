import {auth} from "./auth/auth"
import { createStore } from 'vuex'
import { myTodo } from "./todo/todo"


export default createStore({
    modules:{
        auth,
        myTodo
    }
})