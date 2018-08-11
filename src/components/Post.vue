<template>
    <div class="post">
      <router-link :to="{ name: 'main'}">back</router-link>
      <p>{{ post.title }}</p>
      <p>{{ post.body }}</p>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.email }}<br>
          {{ comment.name }}<br>
          {{ comment.body }}
        </li>
      </ul>
    </div>
</template>

<script>
import PostService from '@/services/PostService'
import CommentService from '@/services/CommentService'

export default {
  name: 'Post',
  data () {
    return {
      post: {
        id: this.$route.params.id,
        title: '',
        body: ''
      },
      comments: []
    }
  },
  mounted () {
    this.getPost()
    this.getComments()
  },
  methods: {
    async getPost () {
      const response = await PostService.getPost(this.post.id)
      this.post = response.data[0]
    },
    async getComments () {
      const response = await CommentService.getComment(this.post.id)
      this.comments = response.data
    }
  }
}
</script>
