<template>
  <div>
    <div id="content" style="background-color:rgb(40, 36, 36);">
        <vue-waterfall-easy :imgsArr="imgsArr" :width="photosWidth" :imgWidth="height/2.5" :height="600" :maxCols="4" :loadingDotCount="0"></vue-waterfall-easy>
    </div>
  </div>
    </template>      
      <script>
      import vueWaterfallEasy from 'vue-waterfall-easy'
        export default {
            props:['photosWidth'],
            data() {
              return {
                imgsArr: [
      { src: './photos/fred.jpeg',},
      { src: './photos/Jean.jpg',},
      { src: './photos/kennidi.jpg'},
      { src: './photos/dengyue.jpg',},
      { src: './photos/independence1.jpg',},
      { src: './photos/liuhuangdao.jpg',},
      { src: './photos/starship.png',},
      { src: './photos/king.jpg',},
      { src: './photos/victory.jpg',},
      { src: './photos/independence2.jpg',},
      { src: './photos/starship.png',},
      { src: './photos/fred.jpeg',},
      { src: './photos/Jean.jpg',},
      { src: './photos/kennidi.jpg',},
      { src: './photos/dengyue.jpg',},
      { src: './photos/independence1.jpg',},
      { src: './photos/liuhuangdao.jpg',},
    ],
                height:window.innerHeight,
  }
            },
            components: {
              vueWaterfallEasy
            },
            methods: {
            },
            created() {
              document.body.style.overflow = 'hidden';
            }
            
          }
      </script>
    <style>
     #content{
      height: 100%;
      width: 100%;
      position: absolute;
      overflow: hidden;
      }
    .vue-waterfall-easy-scroll{
      
    }

    </style>