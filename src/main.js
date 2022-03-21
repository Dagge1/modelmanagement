import { createApp } from 'vue';
import App from './App.vue';
import './css/callbootstrap.scss';  // include this for changing default Bootstrap V5 settings and importing custom scss fonts
import router from './util/router';
import { store } from './store';  // vuex
import InfiniteLoading from 'v3-infinite-loading';  // new updated Vue infinite loading module for Vue 3 version + Vite
import "v3-infinite-loading/lib/style.css"; // infinite loading css

// note: in Vue 3 we use new way to register and access vue infinite loading module
createApp(App).component("infinite-loading", InfiniteLoading).use(router).use(store).mount('#app');
