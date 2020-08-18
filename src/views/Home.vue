<template>
  <div id="home">
    <dl class="article" v-for="item in article" :key="item.id">
      <dt><router-link :to="{name:'garden',params:{category:item}}">{{item}}</router-link></dt>
      <dd>{{item.content}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name:'home',
  data(){
    return {
      article:this.$store.state.sort
    }
  },
}
</script>

<style lang='scss' scoped>
  #home{
    font-family:initial;
    font-size: 20px;
    font-style: normal;
    .article {
      dt {
        margin:10px;
        font-weight:bold;
        color:rgb(115, 115, 192);
        cursor: pointer;
      }
      dd {
        text-indent: 2em;
        font-size: 18px;
      }
    }
  }
</style>