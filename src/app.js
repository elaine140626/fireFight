import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import filters from './utils/filters'
import megaloRouter  from 'megalo-router'
import request from './utils/request'

Vue.use(VHtmlPlugin)

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(megaloRouter, {
  mode: 'strict', // strict or loose 可配置项，不配置的话默认为strict
  tabBars: [ // 必须配置项
      'pages/mailBox/index',
      '/pages/home/index',
      '/pages/myInfo/index',
  ]
})

Vue.prototype.$request = request; 

const app = new Vue(
  App)
app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/home/index',  //首页
      'pages/mailBox/index',  //信箱
      'pages/myInfo/index',  //个人中心
      'pages/consultingBox/index',  //咨询箱
      'pages/badge/index',  //徽章
      'pages/joinGroup/index', //加入群聊
      'pages/solutionRoom/index',  //解忧室
      'pages/ticket/index',  //票券
      'pages/welfare/index',  //福利社
      'pages/memory/index',  //记忆
      'pages/login/index',  //登录
      'pages/auth/index', //设置笔名
      'pages/nofound/index',  //404
      'pages/questionsFeedback/index',  //问题与反馈
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          pagePath: 'pages/mailBox/index',
          text: '邮件',
          iconPath: 'static/imgs/mine.png',
          selectedIconPath: 'static/imgs/mine_on.png',
        },
        {
        pagePath: 'pages/home/index',
        text: 'home',
        iconPath: 'static/imgs/home.png',
        selectedIconPath: 'static/imgs/home_on.png',
        },
        {
        pagePath: 'pages/myInfo/index',
        text: '我的',
        iconPath: 'static/imgs/mine.png',
        selectedIconPath: 'static/imgs/mine_on.png',
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'tell2.0_megalo',
      navigationBarTextStyle: 'black'
    }
  }
}