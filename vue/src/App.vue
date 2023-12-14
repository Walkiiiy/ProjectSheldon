<template>
<div>
<navbar/>
<div>
      <router-view/>
</div>
<div style="z-index: 0; height: 100%; width: 1vw;background-color:rgb(15, 15, 15); position: absolute; right:0; top:2%;"></div>
</div>
</template>
  
  <script>
  import home from '/src/views/home.vue'
  import navbar from '/src/components/navbar.vue';
    export default {
        name: 'app',
        data() {
          return{}
        },
        computed: {
    
        },
        components: {
          home,
          navbar,
        },
        mounted() {
    },
    beforeDestroy() {
    },
        methods: {
      },
    }
  </script>
<style>
 #introduction{
  background-color:rgba(0,255,255,0.95);
  color: blanchedalmond;
  position: absolute;
  top:40vh;
  right: 1vw;
  width: 60vw;
  height: 60vh;
 }
</style>