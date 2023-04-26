import { API } from "aws-amplify";
import { createUser, updateUser, getUser } from '../../graphql/mutations';

export const user = {
    namespaced: true,
    state: {
        user: null
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        }
    },
    actions: {
        async newUser(_, {name, email, password}) {
            try{
                await API.graphql({
                    query: createUser,
                    variables: {
                        input: {
                        "name": name,
                        "email": email,
                        "password": password,
                        "Todos": []
                    }
                    }
                });
            }catch(error){
                console.log(erro)
            }
        },
        async getUser(id) {
            try{
                await API.graphql({
                    query: getUser,
                    variables: {
                        input: {
                        "id": id
                    }
                    }
                });
            }catch(error){
                console.log(erro)
            }
        },


    }
}
