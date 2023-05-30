import { createStore, Commit } from 'vuex'

import axios from 'axios'
export interface Iuser {
  isLogin: boolean,
  nickName?: string,
  _id?: number,
  column?: number,
  email?: string
}
export interface ResponseType<P = null> {
  code: number,
  msg: string,
  data: P;
}
export interface GlobalErrorProps {
  status: boolean,
  message?: string
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps,
  token: string,
  loading: boolean,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    setLoading (state, status) {
      state.loading = status
    },
    createPost (state, newpost) {
      state.posts.push(newpost)
    },
    fetchColumns (state, rowData) {
      state.columns = rowData.data.list
    },
    fetchColumn (state, rowData) {
      state.columns = [rowData.data]
    },
    fetchPosts (state, rowData) {
      state.posts = rowData.data.list
    },
    fetchCurrentUser (state, rowData) {
      state.user = {
        isLogin: true,
        ...rowData.data
      }
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', JSON.parse(JSON.stringify(token)))
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    loginOut (state) {
      localStorage.clear()
      state.token = ''
      state.user = {
        isLogin: false
      }
    }
  },
  actions: {
    createPost ({ commit }, playLoad) {
      return postAndCommit('/posts', 'createPost', commit, playLoad)
    },
    login ({ commit }, playLoad) {
      return postAndCommit('/user/login', 'login', commit, playLoad)
    },
    // 当前用户信息
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    async fetchColumns (context) {
      getAndCommit('/columns', 'fetchColumns', context.commit)
    },
    async fetchColumn (context, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', context.commit)
    },
    async fetchPosts (context, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', context.commit)
    },
    // 组合登陆和获取当前用户信息的acions
    loginAndFetch ({ dispatch }, playLoad) {
      return dispatch('login', playLoad).then(() =>
        dispatch('fetchCurrentUser')
      )
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => state.columns.find(c => c._id === id),
    getPostsByCid: state => (cid: string) => state.posts.filter(post => post.column === cid)
  }
})
export default store
