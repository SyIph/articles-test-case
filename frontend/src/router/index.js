import { createRouter, createWebHistory } from 'vue-router';
import ArticlesView from '../views/ArticlesView.vue';
import ArticleFormView from '../views/ArticleFormView.vue';
import ArticleView from '../views/ArticleView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';

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
    },
    {
      path: '/articles/new',
      name: 'article-create',
      component: ArticleFormView
    },
    {
      path: '/articles/:id/edit',
      name: 'article-edit',
      component: ArticleFormView
    },
    {
      path: '/articles/:id',
      name: 'article',
      component: ArticleView
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView
    }
  ]
})

export default router;
