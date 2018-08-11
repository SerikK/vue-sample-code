import Api from '@/services/Api'

export default {
  getComments () {
    return Api().get('comments')
  },
  getComment (postId) {
    return Api().get('comments?postId=' + postId)
  }
}
