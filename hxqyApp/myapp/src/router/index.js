import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import news from '@/components/news.vue'
import donate from '@/components/donate.vue'
import my from '@/components/my.vue'
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import sign from '@/components/sign.vue'
import donateDetail from '@/components/donateDetail.vue'
import myaccount from '@/components/myaccount.vue'
import changePass from '@/components/changePass.vue'
import feedback from '@/components/feedback.vue'
import newsDetail from '@/components/newsDetail.vue'
import musicControl from '@/components/musicControl.vue'
import confirm from '@/components/confirm.vue'
import pay from '@/components/pay.vue'
import payOrder from '@/components/payOrder.vue'
import payConfirm from '@/components/payConfirm.vue'

Vue.use(Router)
// if(localStorage.getItem('token')){
//   this.$store.commit('set_token',localStorage.getItem('token'))
// }

const router = new Router({
  routes: [
    {
      path: '/',
      name:'home',
      component: home
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
    {
      path: '/donate',
      name:'donate',
      component: donate
    },
    {
      path: '/my',
      name:'my',
      component: my
    },
    {
      path: '/login',
      name:'login',
      component: login,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name:'register',
      component: register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign',
      name:'sign',
      component: sign
    },
    {
      path: '/donateDetail',
      name:'donateDetail',
      component: donateDetail
    },
    {
      path: '/myaccount',
      name:'myaccount',
      component: myaccount
    },
    {
      path: '/changePass',
      name:'changePass',
      component: changePass
    },
    {
      path: '/feedback',
      name:'feedback',
      component: feedback
    },
    {
      path: '/newsDetail',
      name:'newsDetail',
      component: newsDetail
    },
    {
      path: '/musicControl',
      name:'musicControl',
      component: musicControl,
      params:{
        musicStatus:true
      }
    },
    {
      path: '/confirm',
      name:'confirm',
      component: confirm
    }, 
    {
      path: '/pay',
      name:'pay',
      component: pay
    },
    {
      path: '/payOrder',
      name:'payOrder',
      component: payOrder
    },
    {
      path: '/payConfirm',
      name:'payConfirm',
      component: payConfirm
    },
  ]
});

router.beforeEach((to,from,next) => {
  if(to.path === '/login' ||to.path === '/register'){
    next();
  }else{
    let token = localStorage.getItem('token');
    if(!token){
      next('/login');
    }else{
      next();
    }
  }
  // if(to.path !== '/login'){
  //   if(!localStorage.getItem('token')){
  //     this.$router.push('/login');
  //   }
  // }
});

export default router;

