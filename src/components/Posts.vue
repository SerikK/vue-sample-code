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
        <button @click="incrementRating(post.id)">+</button>
        <button @click="decrementRating(post.id)">-</button>
        <router-link :to="{ name: 'post', params: { id: post.id }}">
          {{post.title}} {{ getRating(post.id) }}
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
import { mapGetters } from 'vuex'

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
    this.clearPosts()
    this.getPosts()
    this.getComments()
    this.scroll()
  },
  computed: {
    filteredPosts () {
      return this.$store.state.posts.filter(post => {
        return post.title.includes(this.search)
      })
    },
    ...mapGetters([
      'getRating'
    ])
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
    clearPosts () {
      this.$store.commit('removePosts')
    },
    commentsLength (postId) {
      return this.comments.filter(comment => {
        return comment.postId === postId
      }).length
    },
    incrementRating (postId) {
      return this.$store.dispatch('incrementRating', postId)
    },
    decrementRating (postId) {
      return this.$store.dispatch('decrementRating', postId)
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
