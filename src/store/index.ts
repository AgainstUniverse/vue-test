import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      username:'',
      password:'',
      login:false
    },
    sort:['nodejs','javascript','html','css'],
    article:[
      {
        id:1,
        title:'nodejs',
        author:'赵',
        content:'kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:2,
        title:'javascript',
        author:'钱',
        content:'javascript--kjjjjjjjjkjkjkjkjkjkjklllll',
        pubdate:Date.now()
      },
      {
        id:3,
        title:'html',
        author:'孙',
        content:'html ---kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:4,
        title:'css',
        author:'李',
        content:'css-----kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:5,
        title:'nodejs',
        author:'赵',
        content:'kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:6,
        title:'javascript',
        author:'钱',
        content:'javascript--kjjjjjjjjkjkjkjkjkjkjklllll',
        pubdate:Date.now()
      },
      {
        id:7,
        title:'html',
        author:'孙',
        content:'html ---kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:8,
        title:'nodejs',
        author:'赵',
        content:'kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:9,
        title:'javascript',
        author:'钱',
        content:'javascript--kjjjjjjjjkjkjkjkjkjkjklllll',
        pubdate:Date.now()
      },
      {
        id:10,
        title:'nodejs',
        author:'赵',
        content:'kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:11,
        title:'nodejs',
        author:'赵',
        content:'kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      },
      {
        id:12,
        title:'nodejs',
        author:'钱',
        content:'javascript--kjjjjjjjjkjkjkjkjkjkjklllll',
        pubdate:Date.now()
      },
      {
        id:13,
        title:'nodejs',
        author:'孙',
        content:'html ---kkkkkkkkkkkkkkkkk',
        pubdate:Date.now()
      }
    ]
  },
  mutations: {
    login(state,payload){
      state.userInfo.username = payload.username;
      state.userInfo.password = payload.password;
    },
    checkout(state){
      state.userInfo.username = '';
      state.userInfo.password = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
