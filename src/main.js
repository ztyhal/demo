import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
