<template>
  <div>
    <h1>Новости мира и Казахстана</h1>
    <posts></posts>
  </div>
</template>

<script>
import Posts from '@/components/Posts'

export default {
  name: 'Main',
  components: {
    Posts
  }
}
</script>
