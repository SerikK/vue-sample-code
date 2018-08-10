import Vue from 'vue'
import Router from 'vue-router'
import Post from '@/components/Post'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Main, name: 'main' },
    { path: '/post/:id', component: Post, name: 'post' }
  ]
})
