import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import { useAuth } from '/composables/useAuth';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import AddBookView from '@/views/AddBookView.vue';
import GetBookCountView from '@/views/GetBookCountView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: UserProfileView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/Getbookcount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }

]
// history: createWebHistory(process.env.BASE_URL),
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated.value) {
    next('/login');
  } else {
    next();
  }
});

export default router