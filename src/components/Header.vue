<template>
  <div class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <div>
          <a @click="getWhatsapp">Whatsapp</a>
          <el-divider direction="vertical"></el-divider>
          <a href="mailto: x20251190@student.ncirl.ie">E-mail</a>
          <el-divider direction="vertical"></el-divider>
          <el-popover
            placement="top-start"
            title="QR code"
            width="400"
            trigger="hover"
          >
            <el-image
              style="width: 350px; height: 300px"
              src="../../static/wechat.jpg"
              fit="fill"
            ></el-image>
            <span slot="reference">Wechat</span>
          </el-popover>
        </div>
      </div>

      <div class="navbar-menu-container">
        <span v-if="nickName">Hi, {{ nickName }}</span>
        <a
          href="javascript:void(0)"
          class="navbar-link"
          @click="mdShowLogin = true"
          v-if="!nickName"
          >Log In</a
        >
        <a
          href="javascript:void(0)"
          class="navbar-link"
          @click="logout"
          v-if="nickName"
          >Log Out</a
        >

        <el-badge :value="cartCount" class="item">
          <a href="#" @click="openCart">
            <i class="el-icon-shopping-cart-1"></i>
          </a>
        </el-badge>
      </div>
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#90A955"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/">Investment immigration</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/service"> Visa Appoitment</router-link>
      </el-menu-item>

      <el-menu-item index="3" disabled>User Center</el-menu-item>
      <el-menu-item index="4">
        <router-link to="/">Order History</router-link>
      </el-menu-item>
    </el-menu>
    <!-- login Popup -->
    <modal :mdShow="mdShowLogin" @close="closeModal">
      <p slot="title">Log In</p>
      <div slot="message">
        <div class="error-wrap">
          <span class="error error-show" v-show="errorFlag"
            >Username or password is incorrect</span
          >
        </div>
        <ul>
          <li class="regi_form_input">
            <i class="icon IconPeople"></i>
            <input
              type="text"
              tabindex="1"
              name="loginname"
              v-model="loginname"
              class="regi_login_input regi_login_input_left"
              placeholder="User Name"
              data-type="loginname"
            />
          </li>
          <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input
              type="password"
              tabindex="2"
              name="password"
              v-model="password"
              class="regi_login_input regi_login_input_left login-input-no input_text"
              placeholder="Password"
              @keyup.enter="login"
            />
          </li>
        </ul>
      </div>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn-login" @click="login">Log In</a>
      </div>
    </modal>
    <!-- logout Popup -->
    <modal :mdShow="mdShowLogout" @close="closeModal">
      <p slot="message">
        You are safely logged out!
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn-m" @click="closeModal">Close</a>
      </div>
    </modal>
    <!-- Go to Cart -->
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        Please log in first, otherwise you will not be able to view the shopping
        cart!
      </p>
      <div slot="btnGroup">
        <a class="btn btn-m" href="javascript:;" @click="mdShow = false"
          >Close</a
        >
      </div>
    </modal>
  </div>
</template>
<script>
import "@/assets/css/login.css";
import axios from "axios";
import Modal from "@/components/Modal";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginname: "",
      password: "",
      //  nickName:"",
      errorFlag: false,
      loginModalFlag: false,
      mdShowLogout: false,
      mdShowLogin: false,
      mdShow: false,
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  mounted() {
    this.checkLogin();
  },
  components: {
    Modal
  },
  computed: {
    ...mapState(["nickName", "cartCount"])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getWhatsapp() {
      window.open("https://wa.me/353899540151", "target");
    },
    login() {
      if (!this.password || !this.loginname) {
        this.errorFlag = true;
        return;
      }
      axios
        .post("/users/login", {
          loginname: this.loginname,
          password: this.password
        })
        .then(res => {
          if (res.data.status == 0) {
            this.errorFlag = false;
            this.loginModalFlag = false;
            this.mdShowLogin = false;
            //  this.nickName = res.data.result.nickName
            this.$store.commit("updateUserInfo", res.data.result.nickName);
            this.getCartCount();
          } else {
            alert(`${res.data.msg}`);
            this.errorFlag = true;
          }
        });
    },
    logout() {
      axios.post("/users/logout").then(res => {
        if (res.data.status == "0") {
          this.$store.commit("updateUserInfo", "");
          this.$store.commit("initCartCount", 0);
          this.mdShowLogout = true;

          this.$router.push("/");
        }
      });
    },
    checkLogin() {
      axios.get("/users/checkLogin").then(res => {
        if (res.data.status == "0") {
          //  this.nickName = res.data.result.nickName
          this.$store.commit("updateUserInfo", res.data.result.nickName);
          this.getCartCount();
        } else {
          if (this.$route.path != "/") {
            this.$router.push("/");
          }
        }
      });
    },
    openCart() {
      axios.get("/users/checkLogin").then(res => {
        if (res.data.status == "0") {
          this.$router.push({
            path: "/cart"
          });
        } else {
          this.mdShow = true;
        }
      });
    },
    closeModal() {
      this.mdShowLogout = false;
      this.mdShowLogin = false;
      this.mdShow = false;
    },
    getCartCount() {
      axios.get("/users/getCartCount").then(res => {
        if (res.data.status == "0") {
          this.$store.commit("initCartCount", res.data.result);
        }
      });
    }
  }
};
</script>

<style scoped>
.navbar-cart-logo:hover {
  width: 40px;
}
.el-badge.item {
  margin-left: 15px;
}
.el-icon-shopping-cart-1 {
  font-size: 20px;
}
</style>
