<template>
  <div> 
    <md-table>
      <md-table-row>
        <md-table-head>Title</md-table-head>
        <md-table-head>Platform</md-table-head>
        <md-table-head>Rating</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row 
      v-for="(post, index) in posts"
      :key="index">
        <md-table-cell>{{ post.title }}</md-table-cell>
        <md-table-cell>{{ post.plat }}</md-table-cell>
        <md-table-cell>{{ post.rating }}</md-table-cell>
        <md-table-cell>
          <div class="post_delete" @click="deleteHandler(post.id)">
            Delete
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="confirmDelete"
      md-title="Confirm Delete"
      md-content="Are you sure you want to delete this post? You can't undo this action."
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('admin/getAdminPosts')
    },
    data(){
      return {
        confirmDelete: false,
        toDelete: ''
      }
    },
    computed: {
      posts() {
        let posts = this.$store.getters['admin/getAdminPosts']
        return posts
      }
    },
    methods: {
      deleteHandler(id) {
        this.toDelete = id
        this.confirmDelete = true
      },
      onCancel() {
        this.toDelete = ''
        this.confirmDelete = false
      },
      onConfirm() {
        this.$store.dispatch('admin/deletePost', this.toDelete)
        this.confirmDelete = false
      }
    }
  }
</script>

<style scoped>

</style>