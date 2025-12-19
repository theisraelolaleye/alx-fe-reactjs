const AUTH_KEY = 'isAuthed'

export const isAuthenticated = () => {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true'
  } catch {
    return false
  }
}

export const login = () => {
  try {
    localStorage.setItem(AUTH_KEY, 'true')
  } catch { }
}

export const logout = () => {
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch { }
}
