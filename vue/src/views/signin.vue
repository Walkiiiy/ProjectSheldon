<template>
<div style="position: absolute; width: 100%; height: 100%; background-color:black;"> 
<div style="position: fixed; height: 100vh;  width:1.5vw;left: 0%; top: 0%; background-color:black;"></div>
  <div style="position: fixed; height: 2vh;  width:100vw;left: 0%; top: 0%; background-color:black;"></div>
  <div style="background-color: rgb(33, 33, 33); width: 40%;border-radius: 13px; position:absolute; left:25%; top: 10%; padding:3%; border: 1px solid gray; text-align: center;" >
    <p style="color: white; font-size: 5vh; color:azure;">project sheldon</p>
    <p style="color:coral; font-size: 4vh;">signing in</p>
    <div style="width: 100%; display: flex;
    justify-content: center;
    align-items: center;">
      <p style="color: white;">username:</p>
      <input v-model="userName" style="width: 10vw; margin-left: 4%;">
    </div>
    <div style="width: 100%; display: flex;
    justify-content: center;
    align-items: center;">
    <p style="color: white;">password:</p>
      <input type="password" v-model="password" style="width: 10vw; margin-left: 4%;">
    </div>
    <div>
    <button @click="submit" style="width: 70%; margin-top: 5%; padding: 2%; ; border: none; border-radius: 5px;margin-bottom: 2%;">GO!</button>
    </div>
    <router-link to="/signup" style="color:aliceblue;">sign up</router-link>
    </div>

    <div v-if="card_is_shown" class="card" >
    <button class="close-btn" @click="card_is_shown=0">X</button>
    <div class="content">
      <p>{{ cardPrompt }}</p>
    </div>
    </div>

</div>
</template>
<script>
import axios from 'axios';
import jsencrypt  from 'jsencrypt'
import { EventBus } from '@/eventBus';
export default {
  created() {
    document.body.style.overflow = 'hidden';
  },
  data() {
    return {
      password: '',
      userName: '',
      card_is_shown: 0,
      cardPrompt: '',
    }
  },
  methods: {
    sendSigningMessage() {
      EventBus.$emit('signEvent',this.userName);
    },

    encryptPassword(password, publicKey) {
      const encryptor = new jsencrypt();
      encryptor.setPublicKey(publicKey);
      return encryptor.encrypt(password);
    },

    submit() {
      if (this.userName == '') {
        this.cardPrompt = '请输入用户名！';
        this.card_is_shown = 1;
        return;
      }
      if (this.password == '') {
        this.cardPrompt = '请输入密码！';
        this.card_is_shown = 1;
        return;
      }
      var userData = {
        userNmae: this.userName,
        password: this.password,
      };

      const ipAddress = '127.0.0.1';
      const port = '4000';
      // 拼接完整的 URL
      const apiUrl = `http://${ipAddress}:${port}/userLogin`;

      axios.post(apiUrl, userData)
        .then((Response) => {
          console.log(Response);
          this.cardPrompt = '登录成功！';
          this.card_is_shown = 1;
          this.sendSigningMessage();
        })
        .catch((error) => {
          throw error;
          //  console.log(error.response.status);
          if (error.response.status==401){
            this.cardPrompt = '用户不存在！';
          }
          else if (error.response.status == 402) {
            this.cardPrompt='密码错误！';
          }
          else {
            this.cardPrompt = `error${error.response.status}`;
          }
          this.card_is_shown = 1;
        })      
    }
  }
}
</script>
<style>
.card{
  z-index: 1001;
  position: absolute;
  background-color:rgb(0,0,0);
  top: 27%;
  right: 29%;
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