/* eslint-disable */
import Vue from "vue";


const FirebaseAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const API_KEY = "AIzaSyD2A4UXsc2o4z7qzdruU4fWVDk0s5iGRR8";

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null
  },
  getters: {},
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken
      state.refresh = authData.refreshToken
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
    }
  }
}

export default admin;