<template>
<div>
<div class="tree">
  <tree @childEvent="handleEvent"/>
</div>
<div class="articles">
  <viewer :article_id="article_id"/>
</div>
</div>
</template>
<script>
  import tree from '/src/components/tree.vue'
  import viewer from '/src/components/viewer.vue'
  export default{
    data(){
      return{
        article_id:0,
      }
    },
    components:{
      tree,
      viewer,
    },
    created(){
            document.body.style.overflow = 'hidden';
          },
    methods:{
      handleEvent(data) {
          this.article_id=data;
        },
    }
    }
</script>
<style>
.tree{
    width:35%;
    height: 100%;
    background-color:darkslategray;
    position: absolute;
    left: 0%;
    z-index: 101;
}
.articles{
    width:65%;
    height: 100%;
    background-color:rgb(50, 50, 50);
    position: absolute;
    right: 0%;
    z-index: 100;
    }
</style>