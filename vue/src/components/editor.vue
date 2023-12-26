<template>
  <div>
    <div style="z-index: 1;position: fixed; height: 100vh;  width:1.5vw;left: 0%; top: 0%; background-color:black; z-index: 1;"></div>
  <div style="position: fixed; height: 2vh;  width:100vw;left: 0%; top: 0%; background-color:black;"></div>
  <div style="z-index: 2; width: 100%; height: 100vh; background-color:black;">
  <div style="padding-left: 2%; padding-top: 1%; z-index: 1000;">
    
    <textarea ref="Titlearea" v-model="title" placeholder="题目：此处写下您的结论"
    style="font-size:4vh; border-radius: 13px;width: 90vw; height: 3vh; background-color:rgb(33,33,33); color:white;padding: 2%;overflow: hidden; resize: none;"></textarea>

    <textarea ref="Textarea" v-model="text" placeholder="正文：阐述您的预测理由"
    style="border-radius: 13px;width: 90vw; height: 55vh; background-color:rgb(33,33,33); color:white;padding: 2%; resize: none;font-size: 3vh;"></textarea>
  
  </div>
  <form class="category-form">
        <label>
            <input type="radio" name="category" value="政治" v-model="catrgory">
            政治
        </label>
        <label>
            <input type="radio" name="category" value="经济" v-model="catrgory">
            经济
        </label>
        <label>
            <input type="radio" name="category" value="社会" v-model="catrgory">
            社会
        </label>
        <label>
            <input type="radio" name="category" value="文化" v-model="catrgory">
            文化
        </label>
    </form>
  <div style="position: absolute; right: 3%;">
  <button class="rounded-button" @click="submit()">提交</button>
  </div>
  <div v-if="card_is_shown" class="card" >
    <button class="close-btn" @click="card_is_shown=0">X</button>
    <div class="content">
      <p>{{ cardPrompt }}</p>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { EventBus } from '@/eventBus';
export default {
  name: 'app',
  data () {
    return {
      card_is_shown:0,
      catrgory:'',
      title:'',
      text: '',
      cardPrompt: '',
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
    submit(){
      this.cardPrompt = '已提交，请等待审核！';
      if (this.catrgory == '') {
        this.cardPrompt = '请选择类别!';
        this.card_is_shown=1;
        return;
      }
      if (this.$globaldata.userName== '') {
        this.cardPrompt = '请先登录!';
        console.log(this.$globaldata.userName);
        this.card_is_shown=1;
        return;  
      }
      this.card_is_shown=1;
      const data = {
        aruthor:this.$globaldata.userName,
        content: this.text,
        publish_time:this.getCurrentDateTimeForMySQL(),
        category:this.catrgory,
        title: this.title,
      };

      const ipAddress = '127.0.0.1';
      const port = '4000';
      // 拼接完整的 URL
      const apiUrl = `http://${ipAddress}:${port}/sbmit_article`;
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
  mounted() {
    this.$refs.Titlearea.focus();
  }
}
</script>
<style>
.category-form {
    display: flex;
    color:beige;
    margin-top: 1vh;
    margin-bottom: 2vh;
    position:relative;
    left: 2%;
    top: 2%;
    width: 70vh;
}

label {
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
}

input[type="radio"] {
    margin-right: 5px;
}
.rounded-button {
  position: relative;
  bottom: 5vh;
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
textarea:focus {
    outline: none;
}
</style>