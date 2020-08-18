<template>
  <div id="app">
    <header class="clearfix">    
      <p><router-link to='/'>吾之所向，一往无前</router-link></p>
      <ul>
        <li v-if="!$store.state.userInfo.username">
          <router-link :to="{path:'/login'}">登录</router-link>
        </li>
        <li v-if="!$store.state.userInfo.username">
          <router-link :to="{path:'/register'}">注册</router-link>
        </li>
        <li v-if="$store.state.userInfo.username">{{$store.state.userInfo.username}}</li>
        <li v-if="$store.state.userInfo.username"><el-button plain size="small" type="primary" @click="quit">退出</el-button></li>
      </ul>
    </header>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import {mapMutations} from 'vuex';
export default {
  name: "app",
  data() {
    return {
    };
  },
  created(){
    if(localStorage.getItem('token')){
      console.log(11111)
      let http = new XMLHttpRequest();
      http.open("get", "/launch", false);
      http.setRequestHeader('token',<string>localStorage.getItem('token'));
      http.onreadystatechange =  ()=> {
        if (http.readyState == 4 && http.status == 200) {
          let data = JSON.parse(http.responseText);
          (this as any).login({username:data.data.name,password:data.data.password});
        }
      };
      http.send();
    }
  },
  computed:{},
  mounted() {
  },
  methods: {
    ...mapMutations(['login','checkout']),
    a() {
     alert('zhaozhenguo')
    },
    quit(){
      localStorage.clear();
      this.checkout();
      if((this as any)['$route'].path != '/'){
        (this as any)['$router'].push('/');
      }
      
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
header {
  font-family:xingkai;
  color: rgb(81, 71, 104);
  line-height: 60px;
  p {
    float: left;
    font: {
      size: 30px;
      weight: bold;
      style: italic;
    }
  }
  ul {
    float: right;
    width: 200px;
    font-size: 20px;
    text-align: center;
    li {
      display: inline-block;
      width: 50%;
      cursor: pointer;
      a {
        display: block;
        &:hover {
          color: green;
        }
      }
    }
  }
}
</style>
