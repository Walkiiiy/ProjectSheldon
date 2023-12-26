import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
Vue.config.productionTip = false;
const GlobalData = new Vue({
  data: {
    userName:'',
  }
});
Vue.prototype.$globaldata = GlobalData;
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
