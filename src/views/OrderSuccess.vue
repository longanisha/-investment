<template>
    <div>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>Order Detail</span></h2>
        </div>
        <!-- Progress -->
         <div class="check-step">
          <ul>
            <li class="cur"><span>Select</span>Address</li>
            <li class="cur"><span>Check</span>Order</li>
            <li class="cur"><span>Payment</span></li>
            <li class="cur"><span>Order</span>Confirm</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>Successfully ordered!<br>Your order is being processed!</h3>
            <p>
              <span>Order number:{{orderId}}</span>
              <span>Total Price：{{orderTotal | currency("￥")}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">Cart</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/service">Product List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/NavFooter'
  import {currency} from '@/util/currency'
  import axios from 'axios'
    export default{
      data(){
          return{
            orderId:'',
            orderTotal:0
          }
      },
      components:{
        NavHeader,
        NavFooter
      },
      mounted(){
        this.init()
      },
      filters:{
        currency
      },
      methods:{
        init(){
          this.orderId = this.$route.query.orderId
          if(!this.orderId){
            return;
          }
          axios.get("/users/orderDetail",{
            params:{
              orderId:this.orderId
            }
          }).then(res=>{
            if(res.data.status=='0'){
              this.orderTotal = res.data.result.orderTotal
            }
          })
        }
      }
    }
</script>
