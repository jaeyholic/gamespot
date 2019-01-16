<template>
  <div class="dashboard_form">
    <h1>Add Posts</h1>
    <form @submit.prevent="submitHandler">
      <div v-if="imgUpload">
        <img :src="imgUpload">
      </div>
      <div class="input_field">
        <input type="file"
        @change="processFile($event)"
        ref="myFileInput">
      </div>

      <div class="input_field"
      :class="{invalid: $v.formData.title.$error}">
        <label for="text">Title</label>
        <input type="text"
        @blur="$v.formData.title.$touch()" 
        v-model="formData.title">
        <p class="error_label" v-if="$v.formData.title.$error">
          This input is required
        </p>
      </div>

      <div class="input_field"
      :class="{invalid: $v.formData.plat.$error}">
        <label for="text">Platform</label>
        <input type="text"
        @blur="$v.formData.plat.$touch()" 
        v-model="formData.plat">
        <p class="error_label" v-if="$v.formData.plat.$error">
          This input is required
        </p>
        <p class="error_label" v-if="$v.formData.plat.maxLength">
          Must not be more than {{$v.formData.plat.$params.maxLength.max}} characters
        </p>
      </div>

      <div class="input_field">
        <wysiwyg v-model="formData.content"/>
      </div>

      <div class="input_field"
      :class="{invalid: $v.formData.rating.$error}">
        <label for="">Rating</label>
        <select name="" id="" 
        @blur="$v.formData.rating.$touch()"
        v-model="formData.rating"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p class="error_label" v-if="$v.formData.rating.$error">
          You need to select at least one.
        </p>
      </div>

      <button type="submit">Add Post</button>
    </form>

    <md-dialog :md-active="dialog">
      <p>Your Post has no content, are you sure you want to post this?</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="dialogCancel">Oops, I want to add it</md-button>
        <md-button class="md-primary" @click="dialogConfirm">Yes, I am sure</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div v-if="addPostSuccess" class="post_succesfull">
      Your Post was successfully added.
    </div>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
  export default {
    data() {
      return {
        formData: {
          img: '',
          title: '',
          plat: '',
          content: '',
          rating: ''
        },
        dialog: false
      }
    },
    validations: {
      formData: {
        title: {
          required
        },
        plat: {
          required,
          maxLength: maxLength(100)
        },
        rating: {
          required
        }
      }
    },
    computed: {
      //Adding Post success 
      addPostSuccess() {
        let status = this.$store.getters['admin/addPostStatus']
        if(status) {
          this.clearPost()
          this.$store.commit('admin/clearImgUpload')
        }
        return status
      },
      //img upload
      imgUpload() {
        let imgUrl = this.$store.getters['admin/imgUpload']
        this.formData.img = imgUrl
        return imgUrl
      }
    },
    methods: {
      submitHandler() {
        if(!this.$v.invalid) {
          if(this.formData.content === '') {
            this.dialog = true
          }else {
            this.addPost()
          }
        }else {

        }
      },
      dialogCancel() {
        this.dialog = false
      },

      dialogConfirm() {
        this.dialog = false
        this.addPost()
      },

      addPost() {
        this.$store.dispatch('admin/addPost', this.formData)
      },
      clearPost() {
        this.$v.$reset()
        this.$refs.myFileInput.value = ''
        this.formData = {
          title: '',
          plat: '',
          content: '',
          rating: ''
        }
      },
      processFile(event) {
        let file = event.target.files[0]
        this.$store.dispatch('admin/imgUpload', file)
      }
    },
    destroyed() {
      this.$store.commit('admin/clearImgUpload')
    }
  }
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
  .input_field.invalid input,
  .input_field.invalid select {
    border: 1px solid red;
  }
</style>