<template>
  <div class="container">
    <div class="home_container">
      <md-card
      v-for="(post, index) in posts"
      :key="index">
        <md-card-media md-ratio="4:3">
          <img :src="post.img" alt="post.title">
        </md-card-media>
        <md-card-header>
          <h2 class="title">{{ post.title }}</h2>
          <div class="md-subhead">
            <div>{{ post.plat }}</div>
          </div>
        </md-card-header>

        <md-card-actions>
          <app-button
            type="link"
            :linkTo="`/post/${post.id}`"
            :class="['small_link']">
            See Review
          </app-button>
        </md-card-actions>
      </md-card>

      <div class="load_more">
        <app-button
          type="btn"
          :addClass="['small_link']"
          :action="loadMore">
          Load More
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('posts/getAllPosts', {
        limit: 3
      })
    },
    computed: {
      posts() {
        return this.$store.getters['posts/getAllPosts']
      }
    },
    methods: {
      loadMore() {
        this.$store.dispatch('posts/getAllPosts', {
          limit: this.posts.length + 3
        })
      }
    }
  }
</script>

<style scoped>

</style>