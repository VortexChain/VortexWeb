export const state = () => ({
  currentUser: null,
  currentToken: null,
})

export const mutations = {
  setUser(state, user) {
    state.currentUser = user
  },
  setToken(state, token) {
    state.currentToken = token
    this.$axios.setToken(token, 'Bearer')
  },
  removeToken(state) {
    state.currentToken = null
    this.$axios.setToken(false)
  },
}

export const getters = {
  getToken: (state) => state.currentToken,
}

export const actions = {
  async loginUser({ dispatch, commit }, data) {
    try {
      const result = await this.$fireAuth.signInWithEmailAndPassword(
        data.login,
        data.password
      )
      dispatch('loginSuccess', result)
      return result
    } catch (error) {
      dispatch('loginFailed', error)
      return error
    }
  },
  loginWithGoogle({ dispatch, commit }) {
    const provider = new this.$fireAuthObj.GoogleAuthProvider()
    return dispatch('loginPopup', provider)
  },
  loginWithFacebook({ dispatch, commit }) {
    const provider = new this.$fireAuthObj.FacebookAuthProvider()
    return dispatch('loginPopup', provider)
  },
  loginWithGithub({ dispatch, commit }) {
    const provider = new this.$fireAuthObj.GithubAuthProvider()
    return dispatch('loginPopup', provider)
  },
  loginWithMicrosoft({ dispatch, commit }) {
    const provider = new this.$fireAuthObj.OAuthProvider('microsoft.com')
    return dispatch('loginPopup', provider)
  },
  async loginPopup({ dispatch, commit }, provider) {
    try {
      const result = await this.$fireAuth.signInWithPopup(provider)
      dispatch('loginSuccess', result)
      return result
    } catch (error) {
      dispatch('loginFailed', error)
      return error
    }
  },
  async loginSuccess({ commit }, result) {
    // console.log(result);
    // // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // // ...
  },
  async loginFailed({ dispatch, commit }, error) {
    // console.error(error);
    // dispatch('notifications/showToast', { title: 'Ошибка входа', message: error.message }, { root: true })
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // The email of the user's account used.
    // var email = error.email;
    // // The this.$fireAuthObj.AuthCredential type that was used.
    // var credential = error.credential;
    // // ...
  },
  async createUser({ commit }, data) {
    try {
      const result = await this.$fireAuth.createUserWithEmailAndPassword(
        data.login,
        data.password
      )
      // dispatch('registerSuccess',result)
      return result
    } catch (error) {
      // dispatch('registerFailed',error)
      return error
    }
  },
  async onAuthStateChangedAction({ commit, dispatch }, user) {
    if (user) {
      await dispatch('setupUser', user)
    } else {
      await dispatch('cleanupUser')
    }
  },
  async setupUser({ commit }, authUser) {
    const token = await this.$fireAuth.currentUser.getIdToken()

    const { uid, email, emailVerified, displayName, photoURL } = authUser
    const userInfo = {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL,
    }

    commit('setToken', token)
    commit('setUser', userInfo)
  },
  async refreshToken({ commit }) {
    const token = await this.$fireAuth.currentUser.getIdToken(true)
    commit('setToken', token)
  },
  cleanupUser({ commit }) {
    commit('removeToken')
    commit('setUser', null)
  },
  async updateUser({ commit }, user) {
    try {
      const result = await this.$fireAuth.currentUser.updateProfile({
        displayName: user.name,
        photoURL: user.avatar,
        role: user.role,
      })
      // dispatch('updateUserSuccess',result)
      return result
    } catch (error) {
      // dispatch('updateUserFailed',error)
      return error
    }
  },
}
