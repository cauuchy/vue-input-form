import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import UserForm from '../components/UserForm.vue'

const routes = [
  {
    path: '/',
    name: 'UserForm',
    component: UserForm,
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router; 