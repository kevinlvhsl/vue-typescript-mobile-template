import Vue, { AsyncComponent } from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
const Home: AsyncComponent = (): any => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const About: AsyncComponent = (): any => import(/* webpackChunkName: "about" */ '@/views/About.vue');
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About, // () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    { path: '*', redirect: '/index' },
  ],
});
