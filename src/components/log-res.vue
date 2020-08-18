<template>
  <div class="box">
    <form action="#" method="post">
      <div class>
        <label for></label>
        <el-input placeholder="请输入用户名" suffix-icon="el-icon-user-solid" v-model.trim="username"></el-input>
      </div>
      <div class>
        密&nbsp;&nbsp;码：
        <el-input placeholder="请输入密码" v-model.trim="password" show-password></el-input>
      </div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </form>
    <el-button size="small" type="primary" plain round @click="login(username,password)">login</el-button>
    <el-button size="small" type="primary" plain round @click="plus">+</el-button>
    <el-button size="small" type="primary" plain round @click="minus">-</el-button>
    <el-button size="small" type="primary" plain round @click="time">×</el-button>
    <el-button size="small" type="primary" plain round @click="divide">÷</el-button>
    <el-button size="small" type="primary" plain round @click="shellSort(arr)">排序</el-button>
  </div>
</template>

<script>
// import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      username: "",
      password: "",
      input: "nihao",
      arr: [20, 10, 34, 2, 5, 46, 5, 34, 7, 45, 32, 12, 89, 15, 26, 57, 39],
    };
  },
  methods: {
    login(username, password) {
      if (!username || !password) {
        alert("用户名或密码不能为空");
        return;
      }
      let obj = {
        username: username,
        passname: password,
      };
      let http = new XMLHttpRequest();
      http.open("post", "/login", true);
      http.onreadystatechange =  ()=> {
        if (http.readyState == 4 && http.status == 200) {
          let data = JSON.parse(http.responseText);
          if (data.error == 0) {
            this.$store.commit("login", { username:data.data.name, password:data.data.password });
            localStorage.setItem("token", data.data.token);
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/");
            }
          } else {
            this.$confirm('用户不存在或输入错误','错误',{
              type:'error',
              cancelButtonText:'重新输入',
              confirmButtonText:'注册',
            }).then((action)=>{
              if(action === "confirm"){
                this.$router.push('/register');
              }
            })            
          }
        }
      };
      http.send(JSON.stringify(obj));
    },
    plus() {},
    minus() {},
    time() {},
    divide() {},
    shellSort(arr) {
      var len = arr.length,
        temp,
        gap = 1;
      while (gap < len / 3) {
        //动态定义间隔序列
        gap = gap * 3 + 1;
      }
      for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
          temp = arr[i];
          for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
            arr[j + gap] = arr[j];
          }
          arr[j + gap] = temp;
        }
      }
      console.log(arr);
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>