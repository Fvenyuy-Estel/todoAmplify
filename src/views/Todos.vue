<template lang="">
  <div class="text-center text-4xl py-12 uppercase underline">
    <h1>My Todos</h1>
  </div>
  <div>
    {{message}}
  </div>
    <div v-if="todos == {}" class="text-black">
      Ooopps no todos found
    </div>
    <div v-for="item in todos" :key="item.id" class="grid grid-cols-7 pt-6">
        <h3 class="col-span-2">{{ item.name }}</h3>
        <p class="col-span-3">{{ item.description }}</p>
        <img :src="item.image" />
        <div class="col-span-2 grid grid-cols-2">
          <router-link :to='{
            path:"/edit-todo",
            query:{name:item.name, description: item.description, id:item.id}
          }'>Edit</router-link>
          <!-- <a href="/edit-todo" class=""><button class="bg-yellow-500">Edit</button></a> -->
          <button v-on:click="deleteTodo(item.id)" class="bg-red-600">Delete</button>
        </div>
    </div>

  
</template>
<script setup>
// import { amplify-s3-image } from '@aws-amplify/ui-vue';

</script>
<script>
  import { API } from 'aws-amplify';
  import { listTodos, todosByUserID } from '../graphql/queries';
  import { mapActions, mapGetters } from 'vuex';
  import * as mutations from '../graphql/mutations';
  export default {
    name: 'App',
    async created() {
      this.getTodos();
    },
    data() {
      return {
        name: '',
        description: '',
        todos: [],
        uId:'',
        message: ''
      };
    },
    
    computed: {
        ...mapGetters({
          todos: "myTodos/todos",
        }),
      },
    methods: {
      ...mapActions({
        myTodoVue: "myTodo/getMyTodos",
        deleteTodoVue: "myTodo/deleteTodo"
        }),
      async getTodos() {
        try{
          const todos = await this.myTodoVue();
          // console.log(todos)
          // console.log(this.$store.state)
          this.todos = this.$store.state.myTodo.todos.data.todosByUserID.items;
          // console.log(this.todos)
        }catch(error){
          console.log(error)
        }
      },

      async deleteTodo(id) {
        await this.deleteTodo(id)
        this.message  = "Deleted successfully"
      }
    },
  };
</script>


<style lang="">
    
</style>