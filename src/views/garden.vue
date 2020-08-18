<template>
  <div id="garden">
    <h1>{{$route.params.category}}</h1>
    <ul class="article" v-for="item in article" :key="item.id">
      <li>{{item.id}}</li>
      <li>{{item.title}}</li>
      <li>{{item.author}}</li>
      <li>{{item.content}}</li>
      <li>{{item.pubdate}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'garden',
    data(){
      return{
        article:Array
      }
    },
    mounted(){     
      this.article = this.$store.state.article.filter((item)=>{
        if(item.title == this.$route.params.category){
          return true
        }else {
          return false
        }
      })
    }
}
</script>

<style lang='scss' scoped>
#garden {
  counter-reset: item 0;
  .article {
    counter-reset: sub 0;
    counter-increment: item 1;
    &:before {
      content:counter(item)'、'
    }
    li {
      margin:10px 20px 10px 20px;
      counter-increment: sub 1;
      &::before {
        content: counter(item)'-'counter(sub)'、'
      }
    }
  }
}
</style>