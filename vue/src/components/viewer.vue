<template>
    <div style="margin-left: 5%; margin-right: 5%;">
    <p  style="color: white; 
        font-size:x-large ;">{{ content.title }}</p>
    <textarea readonly style="background-color:rgb(50,50,50); width: 60vw; height: 75vh;  border: none; resize: none; color:aliceblue; font-size: 3vh;">
        {{ content.text }}
    </textarea>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
    return{
        content:{title:'题目',
            text:'正文',    
    },
    }    
    },
    props:['article_id'],
    methods:{
        askforArticle(article_id){
            const ipAddress = '127.0.0.1';
            const port = '4000';
            // 拼接完整的 URL
            const apiUrl = `http://${ipAddress}:${port}/get_article?article_id=${article_id}`;
            axios.get(apiUrl)
            .then(Response=>{
                this.content.title=Response.data.title;
                this.content.text=Response.data.content;
            })
            .catch(error=>{
                console.log(error)
            })
        },
    },
    watch:{
        article_id(newValue,oldValue){
            this.askforArticle(newValue);
        }
    }

}
</script>
<style>
::-webkit-scrollbar {
    width: 0px;
}

</style>