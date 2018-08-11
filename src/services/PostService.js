import Api from '@/services/Api'

export default {
  getPosts () {
    return Api().get('posts')
  },
  getPost (params) {
    return Api().get('posts?id=' + params)
  }
}
