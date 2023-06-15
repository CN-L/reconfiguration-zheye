import { defineStore } from 'pinia'
import { ImageProps, ResponseType } from './utils'
import axios from 'axios'
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface UserDataProps {
  token: string;
  isLogin: boolean;
  data: UserProps | null
}
export const useUsers = defineStore('user', {
  state: ():UserDataProps => {
    return {
      token: localStorage.getItem('token') || '',
      isLogin: false,
      data: null
    }
  },
  actions: {
    async login (email: string, password: string) {
      const payload = {
        email,
        password
      }
      const { data } = await axios.post<ResponseType<{ token: string}>>('/user/login', payload)
      const { token } = data.data
      this.token = token
      localStorage.setItem('token', JSON.parse(JSON.stringify(token)))
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    loginOut () {
      localStorage.clear()
      this.token = ''
      this.isLogin = false
    },
    async fetchCurrentUser () {
      const { data } = await axios.get('/user/current')
      this.isLogin = true
      this.data = { ...data.data }
    }
  }
})
