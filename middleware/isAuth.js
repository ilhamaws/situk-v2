export default function ({ networkError, app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    return redirect('/signin')
  }
  if (networkError === 401) {
    return redirect('/signin')
  }
}