<template>
    <div id="app" class="pt-10">
      <h1>Edit Todo</h1>
      <input type="text" v-model="name" placeholder="Todo name" />
      <input type="text" v-model="description" placeholder="Todo description" />
      <button v-on:click="updateTodo">Edit Todo</button>
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
    // import { createTodo } from '../graphql/mutations';
    import { todosByUserID } from '../graphql/queries';
    import { mapActions } from 'vuex';
    import Nav from "../components/Nav.vue"
    import * as mutations from '../graphql/mutations';
    import { mapGetters } from "vuex";
    export default {
      name: 'App',
      components:{
        Nav
      },
      async created() {
        // this.getTodos();
        
      },
      props:{
        name: String,
        description: String
      },
      data() {
        return {
          name: this.$route.query.name,
          description: this.$route.query.description,
        };
      },
      computed: {
        ...mapGetters({
          user: "auth/user",
          todo: "myTodo/todos"
        }),
      },
      methods: {
        ...mapActions({
          createTodoVue: "myTodo/createNewTodo"
        }),
        async updateTodo() {
          console.log(">>>", this.$store.state)
          const { name, description } = this;
          if (!name || !description) return;
          try{
            await API.graphql({ 
                query: mutations.updateTodo, 
                variables: { input: {
                    name: this.name,
                    description: this.description,
                    id: this.$route.query.id
                } }
            });
            // await mutations.updateTodo({
            //   name: this.name,
            //   description: this.description,
            //   userID: this.$store.state.auth.user.attributes.sub
            // });
          }catch(error){
            console.log(error)
          }
          this.name = '';
          this.description = '';
          
        },
        async editTodo() {
        const todos = await API.graphql({
          query: todosByUserID,
          variables: { userID: this.$store.state.auth.user.attributes.sub }
        });
        this.todos = todos.data.todosByUserID.items;
      }
      }
    };
  </script>