export default (context) => {
  return new Promise((resolve, reject) => {
    context.app.$fireAuth.onAuthStateChanged(async function (user) {
      if (user) {
        // User is signed in.
        return resolve(await context.store.dispatch('user/setupUser', user))

        // context.app.$axios.get('/service/AssociateUser')
        //   var displayName = user.displayName
        //   var email = user.email
        //   var emailVerified = user.emailVerified
        //   var photoURL = user.photoURL
        //   var isAnonymous = user.isAnonymous
        //   var uid = user.uid
        //   var providerData = user.providerData
        // ...
      } else {
        // User is signed out.

        return resolve(await context.store.dispatch('user/cleanupUser'))
      }
    })
  })
}
