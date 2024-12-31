
//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/posts',
        name: 'posts.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/posts/index.vue')
    },
    {
        path: '/create',
        name: 'posts.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/posts/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'posts.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/posts/edit.vue')
    },
    {
        path: '/carts',
        name: 'carts.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/carts/index.vue')
    },
    {
        path: '/create',
        name: 'carts.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/carts/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'carts.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/carts/edit.vue')
    },
    {
        path: '/products',
        name: 'products.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/products/index.vue')
    },
    {
        path: '/create',
        name: 'products.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/products/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'products.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/products/edit.vue')
    },
    {
        path: '/messages',
        name: 'messages.index',
        component: () => import( /* webpackChunkName: "create" */ '../views/Messages/index.vue')
    },
    {
        path: '/create',
        name: 'messages.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/Messages/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'messages.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/Messages/edit.vue')
    },
    {
        path: '/users',
        name: 'users.index',
        component: () => import( /* webpackChunkName: "create" */ '../views/users/index.vue')
    },
    {
        path: '/create',
        name: 'users.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/users/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'users.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/users/edit.vue')
    },
    {
        path: '/orders',
        name: 'orders.index',
        component: () => import( /* webpackChunkName: "create" */ '../views/orders/index.vue')
    },
    {
        path: '/create',
        name: 'orders.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/orders/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'orders.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/orders/edit.vue')
    },
   
]
//create router
const router = createRouter({
history: createWebHistory(),
routes // <-- routes,
})
export default router