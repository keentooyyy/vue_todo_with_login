import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoView from "../views/TodoView.vue";
import EditTodo from "@/views/EditTodo.vue";

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/todo',
        component: TodoView,
    },
    {
        path: "/todo/:id",
        name: 'todo_items',
        component: EditTodo,
        props: true,

    }

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;