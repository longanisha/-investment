// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueLazyLoad from "vue-lazyload"; //图片懒加载
import infiniteScroll from "vue-infinite-scroll";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Cookies from "js-cookie";
Vue.use(ElementUI);
Vue.use(Cookies);
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(infiniteScroll);
Vue.use(VueLazyLoad, {
  error: require("../static/loading-svg/loading-balls.svg"),
  loading: require("../static/loading-svg/loading-balls.svg")
});

const store = new Vuex.Store({
  state: {
    nickName: "",
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  store,
  router,
  components: { App },
  template: "<App/>"
}).$mount("#app");

router.beforeEach((to, from, next) => {
  console.log(to, 99999999);
  const name = Cookies.get("userId");
  console.log(name, 777777777);
  if (
    !name &&
    (to.path == "/cart" ||
      to.path == "/address" ||
      to.path == "/orderConfirm" ||
      to.path == "/orderSuccess")
  ) {
    next({
      path: "/"
    });
  } else {
    next();
  }
});
