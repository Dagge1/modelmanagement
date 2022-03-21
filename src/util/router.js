import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Detailed from '../components/Detailed.vue';

const routes = [
  {path: '/', name: 'home', component: Home},  // optional param on change of model name and going back to the main page
  {path: '/detailed/:person', name: 'detailed', component: Detailed},
  {path: '/:catchAll(.*)', component: Home}  // for all other routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;