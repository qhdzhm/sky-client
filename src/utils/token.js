//token haddler

const TOKEN = 'token'

const setToken = (token)=>localStorage.setItem(TOKEN,token)
  
const getToken = ()=>localStorage.getItem(TOKEN)

const clearToken = ()=>localStorage.removeItem(TOKEN)

export {
  setToken,
  getToken,
  clearToken
}