<template>
    <div style="margin-top: 5%; margin-left: 20%;">
         <!-- 
        data   用来展示数据
        props  树状图配置
               label   	指定节点标签为节点对象的某个属性值
               children	指定子树为节点对象的某个属性值
               disabled	指定节点选择框是否禁用为节点对象的某个属性值
               isLeaf	  指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效  (就是设置这个节点是否有右箭头，懒加载模式下才有)
        @node-click 节点的点击事件
    -->
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" 
        style="color: white; font-size: larger;"
      ></el-tree>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
import { Tree } from 'element-ui';
    export default {
      components: {
      [Tree.name]: Tree
    },
    name: "tree1",
    data() {
      return {
        data: [
          {
            label: "一级 2",
            children: [
              {
                label: "二级 2-1",
                children: [
                  {
                    label: "三级 2-1-1",
                    id:1,
                  },
                ],
              },
              {
                label: "二级 2-2",
                children: [
                  {
                    label: "三级 2-2-1",
                    id:2,
                  },
                ],
              },
            ],
          },
        ],
        defaultProps: {
          children: "children",
          label: "label",
        },
      };
    },
    methods: {
      sendEvent(id) {
      this.$emit('childEvent', id);
    },
      handleNodeClick(data) {
        if(data.children==undefined){
          this.sendEvent(data.id)
        }
      },
      getArticleTree(){
        const ipAddress = '127.0.0.1';
        const port = '4000';
        // 拼接完整的 URL
        const apiUrl = `http://${ipAddress}:${port}/getArticleTree`;
        axios.get(apiUrl)
        .then(Response=>{
            this.data=Response.data;
        })
        .catch(error=>{
          console.log('error while fetching articleTree!',error);
        })
      },
    },
    mounted(){
      this.getArticleTree();
    }
  };
  </script>
  
  
  <style scoped>
  </style>
  