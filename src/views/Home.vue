
<template>
 <el-container>

  <el-header>
 <nav-header></nav-header>
  </el-header>
  <el-main>
  
   <transition name="move" mode="out-in">
     
      <router-view></router-view>  
      </transition>
    
  </el-main>
  <el-footer>
  <nav-footer></nav-footer>
  </el-footer>
</el-container>
</template>

<script>
  import '@/assets/css/base.css'
  import '@/assets/css/checkout.css'
  import '@/assets/css/login.css'
  import '@/assets/css/product.css'
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import Swiper from '@/components/SwiperNow'
  import axios from 'axios'  //默认到node_modules中遍历
  import {currency} from '@/util/currency'
  export default {
   data(){
     return {
       goodsList:[],
       priceFilter:[
         {
           startPrice:"0.00",
           endPrice:"500.00"
         },
         {
           startPrice:"500.00",
           endPrice:"1000.00"
         },
         {
           startPrice:"1000.00",
           endPrice:"3000.00"
         },
         {
           startPrice:"3000.00",
           endPrice:"5000.00"
         }
       ],
       priceChecked:"all",
       filterBy:false,
       overLayFlag:false,
       sortFlag:true,
       page:1,
       pageSize:8,
       busy:true,
       loading:false,
       mdShow:false,
       mdShowCart:false

     }
   },
   components:{
     NavHeader,
     NavFooter,
     NavBread,
     Modal,
     Swiper
   },
   filters:{
    currency:currency
  },
   mounted(){
     this.getGoodsList()
   },
   methods:{
     getGoodsList(flag){
      let param = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag?1:-1,
        priceLevel:this.priceChecked
      }
      this.loading = true
      axios.get("/goods/list",{
        params:param
      }).then(res=>{
        let data = res.data
        clearInterval(loadingTime)
        var loadingTime=setInterval(()=>{
          this.loading=false
        },1000)
        if(data.status =="0"){
          if(flag){
            this.goodsList = this.goodsList.concat(data.result.list)
            if(data.result.count==0){
              this.busy=true
            }else{
              this.busy=false
            }
          }else{
            this.goodsList = data.result.list
            this.busy=false
          }
        }else{
          this.goodsList = []
        }
      })
     },
     clickAll(){
       this.priceChecked='all'
       this.getGoodsList()
     },
     sortGoods(){
       this.sortFlag = !this.sortFlag
       this.page=1
       this.getGoodsList()
     },
     showFilterPop(){
       this.filterBy = true
       this.overLayFlag = true
       this.page=1
     },
     setPriceFilter(index){
       this.priceChecked = index
       this.closePop()
       this.page=1
       this.getGoodsList()
     },
     closePop(){
       this.filterBy = false,
       this.overLayFlag = false
     },
     loadMore(){
      this.busy=true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      },1000);
     },
     addCart(productId){
       axios.post("/goods/addCart",{
         productId:productId
       }).then(res=>{
         if(res.data.status==0){
           this.mdShowCart = true
           this.$store.commit('updateCartCount',1)
         }else{
           this.mdShow=true
         }
       })
     },
     closeModal(){
       this.mdShow = false
       this.mdShowCart = false
     }
   }
  }
</script>


<style scoped>
  .el-header, .el-footer {
    background-color: #ecf39e;
    text-align: center;
    height: auto !important;
    padding: 0;
     display: flex;
  flex-direction: column;
  }
   .el-header　{
    display: flex;
    align-items: center;
   
   }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
   
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .btn .btn-m{
    font-size: 12px;
  }
</style>