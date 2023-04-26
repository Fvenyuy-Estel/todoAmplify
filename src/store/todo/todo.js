
import { createTodo, deleteTodo } from '../../graphql/mutations';
import { API, Auth, Storage } from 'aws-amplify';
import { todosByUserID } from '../../graphql/queries';
export const myTodo = {
    namespaced: true,
    state:{
        todos: null
    },
    mutations:{
        setTodos(state, payload){
            state.todos = payload;
        }
    },

    actions:{
        async createNewTodo(_, {name, description, userID, file}){
            // console.log(">>>>>> File>>>>", file)
            let key
            try{


                // image upload
                try {
            
                    key = await Storage.put(Math.random() + "_" + file.name, file, {
                      level: "public",
                      type: "image/png",
                    });
            
                    console.log(key);
                  } catch (error) {
                    console.log(error)
                    return { success: false, result: error };
                  }
                  
                  
                console.log(name)
                await API.graphql({
                    query: createTodo,
                    variables: { input: {name, description, userID, image:key.key} }
                  });
                return Promise.resolve();
            }catch(error){
                console.log(error)
                return Promise.reject(error);
            }
        },

        
        async getMyTodos({commit}){
            const user = await Auth.currentAuthenticatedUser();
            const id = user.attributes.sub;
            console.log(user)
            try{
                const myTodos = await API.graphql({
                    query: todosByUserID,
                    variables: { userID:  id}
                  });
                  console.log(">>>>>>",myTodos)
                  for(let todo of myTodos.data.todosByUserID.items){
                    try {
                        const signedUrl = await Storage.get(todo.image);
                        console.log("link: ",signedUrl);
                        todo.image = signedUrl;
                      } catch (error) {
                        console.log(error);
                        continue;
                      }
                  }

                  commit("setTodos", myTodos);
                Promise.resolve("Success");
            }catch(error){
                this.error = error
                console.log(error);
                Promise.reject(error)
            }
        },

        async deleteTodo (id){
            try{
                await API.graphql({
                    query: deleteTodo,
                    variables: {
                        input: {
                            id: id
                        }
                    }
                });
                this.$router.push('/todos')
            }catch(error){
                console.log(error)
            }
        }
    },
    getters:{
            todos: (state) => state.todos
    }
}