// Vuex management store - new version V4 for Vue3
import { createStore } from 'vuex';

export const store = createStore({
    state() {  
        return {
            //modelName: {id: '', name: ''}  // changed model id and name
            modelName: []
        }
    },
    mutations: {  // data change function
        saveName(state, payload) {  // save changed model name into vuex for later use across app
            state.modelName.push(payload);
        }
    }
});