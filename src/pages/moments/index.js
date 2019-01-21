import App from './moments'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()
export default {
  config: {
    navigationBarBackgroundColor: '#81CBE2',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '动态',
    backgroundColor: '#81CBE2'
  }
}