/* eslint-disable */
import Vue from "vue";
import router from '../../router';


const FirebaseAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const API_KEY = "AIzaSyD2A4UXsc2o4z7qzdruU4fWVDk0s5iGRR8";

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
    authFailed: false,
    refreshLoader: true,
    addPost: false,
    imgUpload: null,
    adminPosts: null
  },
  getters: {
    isAuth(state) {
      if(state.token) {
        return true
      }
      return false
    },
    refreshLoader(state) {
      return state.refreshLoader
    },
    addPostStatus(state) {
      return state.addPost
    },
    imgUpload(state) {
      return state.imgUpload
    },
    getAdminPosts(state) {
      return state.adminPosts
    }
  },
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken
      state.refresh = authData.refreshToken

      //route user to dashboard
      if(authData.type === 'signIn') {
        router.push('/dashboard')
      }
    },
    authFailed(state, type) {
      if(type === 'reset') {
        state.authFailed = false
      } else {
        state.authFailed = true
      }
    },
    logoutUser(state) {
      state.token = null
      state.refresh = null
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');

      //direct user back to home after logout
      router.push('/')
    },
    refreshLoader(state) {
      state.refreshLoader = false
    },
    addPost(state) {
      state.addPost = true
    },
    clearAddPost(state) {
      state.addPost = false
    },
    imgUpload(state, imgData) {
      state.imgUpload = imgData.secure_url
    },
    clearImgUpload(state) {
      state.imgUpload = null
    },
    getAdminPosts(state, posts) {
      state.adminPosts = posts
    }
  },
  actions: {
    signIn({commit}, payload) {
      Vue.http.post(`${FirebaseAuth}/verifyPassword?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true
      })
      .then(response => response.json())
      .then(authData => {
        commit("authUser", {
          ...authData,
          type: 'signIn'
        });
        localStorage.setItem("token", authData.idToken)
        localStorage.setItem("refresh", authData.refreshToken)
      })
      .catch( error => {
        commit('authFailed')
      })
    },
    refreshToken({commit}) {
      const refreshToken = localStorage.getItem('refresh');

      if(refreshToken) {
        Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}
        `, {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then( response => response.json())
        .then(authData => {
          commit('authUser', {
            idToken: authData.id_token,
            refreshToken: authData.refresh_token,
            type: 'refresh'
          })
          commit('refreshLoader')
          localStorage.setItem("token", authData.id_token)
          localStorage.setItem("refresh", authData.refresh_token)
        })
      } else {
        commit('refreshLoader')
      }
    },
    addPost({commit, state}, payload) {
      Vue.http.post(`posts.json?auth=${state.token}`, payload)
      .then(response => response.json())
      .then(response => {
        commit('addPost')
        setTimeout(() => {
          commit('clearAddPost')
        }, 3000)
      })
    },
    imgUpload({commit}, file) {
      const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/lunar-studios/image/upload"
      const CLOUDINARY_PRESET = 'qssdufvp'

      let formData = new FormData();
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_PRESET)

      Vue.http.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => response.json())
      .then(response => {
        commit('imgUpload', response)
      })
    },
    getAdminPosts({commit}) {
      Vue.http.get('posts.json')
      .then(response => response.json())
      .then(response => {
        const posts = []
        for(let key in response) {
          posts.push({
            ...response[key],
            id: key
          })
        }
        commit('getAdminPosts', posts.reverse())
      })
    },
    deletePost({commit, state}, payload) {
      Vue.http.delete(`posts/${payload}.json?auth=${state.token}`)
      .then(response => {
        let newPosts = []
        state.adminPosts.forEach(post => {
          if(post.id != payload) {
            newPosts.push(post)
          }
        })
        commit('getAdminPosts', newPosts)
      })
    }
  }
}

export default admin;