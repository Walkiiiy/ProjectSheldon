<template>
  <div style="width: 100%; height: 100vh; background-color:rgb(50,50,50);">
  <div style="padding-left: 2%; padding-top: 1%; z-index: 1000;">
    <textarea ref="Textarea" v-model="text" style="border-radius: 13px;width: 90vw; height: 70vh; background-color:darkslategray; color:white;padding: 2%; resize: none;"></textarea>
  </div>
  <div style="position: absolute; right: 3%;">
  <button class="rounded-button" @click="submit(0,text)">提交</button>
  </div>
  <div v-if="card_is_shown" class="card" >
    <button class="close-btn" @click="card_is_shown=0">X</button>
    <div class="content">
      <p>已提交，请耐心等待审核</p>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      card_is_shown:0,
      config: {
        language: "zh_cn",//国际化
        height:380,
        width:1100,
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      text: ''
    }
  },
  methods:{
    getCurrentDateTimeForMySQL() {
    let now = new Date();

    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份是从0开始的
    let day = ('0' + now.getDate()).slice(-2);

    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    let seconds = ('0' + now.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    submit(userId, articleContent){

      this.card_is_shown=1;

      const data = {
        author: userId,
        content: articleContent,
        publish_time:this.getCurrentDateTimeForMySQL()
      };

      const ipAddress = '127.0.0.1';
      const port = '4000';
      // 拼接完整的 URL
      const apiUrl = `http://${ipAddress}:${port}/sbmit_article`;
      console.log(this.model)
      axios.post(apiUrl, data)
        .then(function(response) {
            // 请求成功时的操作
            console.log('Article submitted successfully:', response.data);
        })
        .catch(function(error) {
            // 请求失败时的操作
            console.error('Error submitting article:', error);
        });
      }
  },
  mounted(){
    this.$refs.Textarea.focus();
  }
}
</script>
<style>
.rounded-button {
  background-color:white;
  border: none;
  color:black; 
  padding: 7px 32px; /* 上下 15px，左右 32px 的内边距 */
  text-align: center; /* 文字居中 */
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 13px; /* 圆角 */
}
.card{
  z-index: 1001;
  position: absolute;
  background-color:rgba(0,0,0,0.4);
  top: 40%;
  right: 30%;
  height: 20%;
  width: 40%;
  border: none;
  color:white; /* 白色文字 */
  padding: 7px 32px; 
  padding-top: 40px;
  text-align: center; /* 文字居中 */
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 13px; /* 圆角 */
  border-color: white;
  border-width: 5px;
}
.close-btn{
  position:absolute;
  top:5%;
  right:2%
}
</style>