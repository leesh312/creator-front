
const LoginAuthHelper = {
  getToken: () => {
    return localStorage.getItem("authorization")
  },
  setToken: (token: string) => {
    localStorage.setItem("authorization", token)
  },
  removeToken: () => {
    localStorage.removeItem("authorization")
  },

}

export default LoginAuthHelper