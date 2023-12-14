<template>
<div>
    <div id="content" >
    <photos :photosWidth="windowWidth"></photos>
    </div>
    <div id="introduction">
    <div id="text-area" style="margin-left: 2vw; margin-top: 1vh;">
    <h1 style="color:darkslategray; font-size: 3vw;">project</h1>
    <h1 style="color:darkslategray; font-size: 3.5vw;">Sheldon</h1>
    <a><p style="color: black; font-size: 1vw; position: absolute; top: 20vh; right: 8vw;">点击这里开始</p><p style="color:darkslategray; font-size: 5vw; position: absolute; top: 7vh; right: 3vw;">-></p></a>
    <div  style="color:darkslategray; font-weight: 570;">
    <p>谢顿计划————在《银河帝国》中，哈里·谢顿利用心理史学，通过预测人类社会走向，试图建立第二帝国。</p>
    <p>利用人类群体意识的总体规律，推断未来的历史发展，是可行的吗？</p>
    <p>还是说，我们作为一个物种的发展轨迹是完全随机的？</p>
    <p>加入这场实验！加入project_Shedlon，写下你对未来任何事件的任何看法，和大家分享交流！</p>
    </div>
  </div>
</div>
</div>
</template>
<script>
  import photos from '/src/components/photos.vue'
    export default {
        data() {
          return {  
            windowWidth:0,
            }
        },
        computed: {
          halfWindowWidth() {
            return this.windowWidth;
          }
        },
        components: {
          photos,
        },
        mounted() {
      this.updateWindowSize();
      window.addEventListener('resize', this.updateWindowSize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateWindowSize);
    },
        methods: {
          
        updateWindowSize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }
      }
    }
  </script>
<style>
 #introduction{
  background-color:rgba(0,255,255,0.1);
  color: blanchedalmond;
  position: absolute;
  top:40vh;
  right: 1vw;
  width: 60vw;
  height: 60vh;
 }
</style>