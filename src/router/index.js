import {createRouter, createWebHistory} from "vue-router";
import NotFoundView from "../views/NotFoundView.vue";
import FlatView from "../views/FlatView.vue";
import FlatsView from "../views/FlatsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/flats'
    },
    {
      path: '/flats',
      name: 'flats',
      component: FlatsView,
    },
    {
      path: '/flats/:id',
      name: 'flat',
      component: FlatView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ]
});

export default router;
