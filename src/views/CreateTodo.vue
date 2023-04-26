<template>
    <div id="app" class="pt-10">
      <h1>Add Todo</h1>
      <input type="text" v-model="name" placeholder="Todo name" />
      <input type="file" @change="previewFiles" placeholder="Todo name" />
      <input type="text" v-model="description" placeholder="Todo description" />
      <button v-on:click="createTodo">Create Todo</button>
      <div class="text-3xl border">Todo</div>
      <div v-for="item in todos" :key="item.id">
        <div class="grid grid-cols-3 pt-5">
            <div class="border-x-2">
                <h3 class="p-5">{{ item.name }}</h3>
            </div>
        </div>
        <div class="text-3xl border">Todo</div>
        <!-- <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p> -->
      </div>
      
    </div>
  </template>
  
  <script>
    import { API } from 'aws-amplify';
    import { createTodo } from '../graphql/mutations';
    import { todosByUserID } from '../graphql/queries';
    import { mapActions } from 'vuex';
    import Nav from "../components/Nav.vue"
import { mapGetters } from "vuex";
    export default {
      name: 'App',
      components:{
        Nav
      },
      async created() {
        this.getTodos();
        
      },
      data() {
        return {
          name: '',
          file:'',
          description: '',
          todos: []
        };
      },
      computed: {
        ...mapGetters({
          user: "auth/user",
        }),
      },
      methods: {
        ...mapActions({
        myTodoVue: "myTodo/getMyTodos",
          createTodoVue: "myTodo/createNewTodo"
          }),

      async getTodos() {
        try{
          const todos = await this.myTodoVue();
          this.todos = this.$store.state.myTodo.todos.data.todosByUserID.items;
        }catch(error){
          console.log(error)
        }
      },
      
        async createTodo() {
          console.log(">>>", this.$store.state.auth.user.attributes.sub)
          const { name, description } = this;
          if (!name || !description) return;
          try{
            await this.createTodoVue({
              name: this.name,
              description: this.description,
              userID: this.$store.state.auth.user.attributes.sub,
              file: this.file
            });
          }catch(error){
            console.log(error)
          }
          this.name = '';
          this.description = '';
          
        },

      previewFiles(event){
        this.file = event.target.files[0]
      }
      }
    };
  </script>