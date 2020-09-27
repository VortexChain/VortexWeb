export default function ({ app, store, redirect, error, $fireAuth }) {
  if (!store.state.user.currentUser) {
    return redirect(app.localePath('login'))
  }
}
