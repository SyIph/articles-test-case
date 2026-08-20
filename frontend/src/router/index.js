import { createRouter, createWebHistory } from 'vue-router';
import ArticlesView from '../views/ArticlesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    }
  ]
})

export default router;
