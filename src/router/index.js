import Vue from 'vue'
import Router from 'vue-router'
import Cart from '@/views/Cart'
import OrderService from '@/views/OrderService'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import Home from '@/views/Home'
import Swiper from '@/components/SwiperNow'
import Imigrate from '@/views/Imigrate'
import AdminLogin from '@/views/AdminLogin'

Vue.use(Router)


 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/home',
      children: [
        {
        
          path: '/home',
          name: 'Swiper',
          component: Swiper,
         
        },
        {
          path: '/service',
          name: 'OrderService',
          component: OrderService,
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/address',
          name: 'Address',
          component: Address
        },
        {
          path: '/orderConfirm',
          name: 'OrderConfirm',
          component: OrderConfirm
        },
        {
          path: '/orderSuccess',
          name: 'OrderSuccess',
          component: OrderSuccess
        },
        {
          path: '/imigrate',
          name: 'Imigrate',
          component: Imigrate
        }
      ]
    },
    {
      path: '/adminLogin',
      name: 'AdminLogin',
      component: AdminLogin,
    }   
  ]
})
