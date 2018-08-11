<template>
  <div>
    <input v-model="search" placeholder="Поиск" v-on:keydown.enter="getPosts()">
    <p>Displaying {{ filteredPosts.length }} posts, filtered by <strong>{{ search }}</strong></p>
    <table>
      <thead>
        <tr>
          <th>Заголовок</th>
          <th>Полное описание</th>
          <th>Количество комментарии</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="post in filteredPosts" :key="post.id">
        <td>
        <router-link :to="{ name: 'post', params: { id: post.id }}">
          {{post.title}}
        </router-link>
        </td>
        <td>{{ post.body }}</td>
        <td>{{ commentsLength(post.id) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PostService from '@/services/PostService'
import CommentService from '@/services/CommentService'

export default {
  name: 'Posts',
  data () {
    return {
      search: '',
      posts: [],
      comments: [],
      postsLength: 15
    }
  },
  mounted () {
    this.getPosts()
    this.getComments()
    this.scroll()
  },
  computed: {
    filteredPosts () {
      return this.$store.state.posts.filter(post => {
        return post.title.includes(this.search)
      })
    }
  },
  methods: {
    async getPosts () {
      const response = await PostService.getPosts()
      this.posts = response.data
      for (let i = 1; i <= this.postsLength; i++) {
        this.$store.commit('addPost', this.posts[i])
      }
    },
    async getComments () {
      const response = await CommentService.getComments()
      this.comments = response.data
    },
    commentsLength (postId) {
      return this.comments.filter(comment => {
        return comment.postId === postId
      }).length
    },
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          for (let i = this.postsLength + 1; i <= this.postsLength + 10; i++) {
            this.$store.commit('addPost', this.posts[i])
          }
          this.postsLength += 10
        }
      }
    }
  }
}
</script>
