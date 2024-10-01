import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoView from "../views/TodoView.vue";

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/todo',
        component: TodoView,
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;