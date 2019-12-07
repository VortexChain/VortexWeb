import https from 'https'

export default function (context) { //{ $axios, redirect }
  context.$axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  context.$axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  context.$axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      console.error('Axios error', '400')
    }
    if (code === 401) {
      context.store.dispatch('logoutUser')
      context.redirect('/login')
    }
  })
}