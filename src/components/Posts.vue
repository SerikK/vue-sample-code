<template>
  <div>
    <input v-model="search" placeholder="Поиск" v-on:keydown.enter="getPosts()">
    <p>Displaying {{ filteredPosts.length }} posts, filtered by <strong>{{ search }}</strong></p>
    <ul>
      <li v-for="post in filteredPosts" :key="post.id">
        <router-link :to="{ name: 'post', params: { id: post.id }}">
          {{post.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  name: 'Posts',
  data () {
    return {
      search: '',
      posts: []
    }
  },
  created () {
    this.getPosts()
  },
  computed: {
    filteredPosts () {
      return this.posts.filter(post => {
        return post.title.includes(this.search)
      })
    }
  },
  methods: {
    async getPosts () {
      const response = await PostService.getPosts()
      this.posts = response.data
    }
  }
}
</script>
