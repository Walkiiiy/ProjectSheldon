<template>
  <div>
    <div style="background-color: coral;">
    <div id="articleRangeChart" style="height:40vh;width: 100vw;"></div>
    </div>
    <div style="background-color: aqua;">
    <div id="pridictionRangeChart" style="height:40vh;width: 100vw;"></div>      
    </div>
    <div style="background-color:tan;">
    <div id="correctRangeChart" style="height:40vh;width: 100vw;"></div>      
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      articleRangeOption :{
  title: {
    text: 'articleRange'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: []
  },
  series: [
    {
      type: 'bar',
      data: []
    },
  ]
      },


pridictionRangeOption :{
  title: {
    text: 'pridictionRange'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: []
  },
  series: [
    {
      type: 'bar',
      data: []
    },
  ]
      },
    
correctRangeOption :{
  title: {
    text: 'correctRange'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: []
  },
  series: [
    {
      type: 'bar',
      data: []
    },
  ]
      },
    }
  },
  methods: {
    drawLine(){
      let articleRangeChart = this.$echarts.init(document.getElementById("articleRangeChart"));
      articleRangeChart.setOption(this.articleRangeOption);
      let pridictionRangeChart = this.$echarts.init(document.getElementById("pridictionRangeChart"));
      pridictionRangeChart.setOption(this.pridictionRangeOption);
      let correctRangeChart = this.$echarts.init(document.getElementById("correctRangeChart"));
      correctRangeChart.setOption(this.correctRangeOption);      
    },
    getStastic(callback) {
      const ipAddress = '127.0.0.1';
      const port = '4000';
      // 拼接完整的 URL
      const apiUrl = `http://${ipAddress}:${port}/getChartData`;
      axios.get(apiUrl)
        .then(response => {
          // console.log(response.data);
          const res=response.data
          for (let i = 0; i < res.length; i++){
            this.articleRangeOption.yAxis.data.push(res[i].username);
            this.articleRangeOption.series[0].data.push(res[i].articleNum);
            this.correctRangeOption.yAxis.data.push(res[i].username);
            this.pridictionRangeOption.yAxis.data.push(res[i].username);
          }
          if (callback) {
            callback();
          }
        })
     .catch(error => {
         console.error('Error fetching data: ', error);
     })
    }
  },
  mounted() {
    this.getStastic(() => {
      this.drawLine();
    })
  },

}
</script>
<style>
</style>