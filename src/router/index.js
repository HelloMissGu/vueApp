import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import news from '@/components/news.vue'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name:'home',
      redirect: home
    },
    {
      path: '/home',
      name:'home',
      component: home
    },
    {
      path: '/news',
      name:'news',
      component: news
    },
   
  ]
})


