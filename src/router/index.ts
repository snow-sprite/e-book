import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'bookcase',
    component: () => import(/* webpackChunkName: "List" */ '../views/List.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/Miss.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
