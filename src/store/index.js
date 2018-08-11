import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      posts: [],
      rating: []
    },
    getters: {
      getRating: state => postId => {
        if (typeof state.rating[postId] === 'undefined') {
          state.rating[postId] = 0
        }

        return state.rating[postId]
      }
    },
    mutations: {
      addPost (state, post) {
        state.posts.push(post)
      },
      removePosts (state) {
        state.posts = []
      },
      incrementRating (state, postId) {
        return Vue.set(state.rating, postId, state.rating[postId] + 1)
      },
      decrementRating (state, postId) {
        return Vue.set(state.rating, postId, state.rating[postId] - 1)
      }
    },
    actions: {
      incrementRating: ({commit}, postId) => commit('incrementRating', postId),
      decrementRating: ({commit}, postId) => commit('decrementRating', postId)
    }
  }
)
