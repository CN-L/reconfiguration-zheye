import { createStore, Commit } from 'vuex'

import axios, { AxiosRequestConfig } from 'axios'
import { arrToObjt, objtToArray } from '@/help'
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
interface ListProps<T> {
  [id: string] : T
}
export interface GlobalDataProps {
  currentPost: PostProps,
  error: GlobalErrorProps,
  token: string,
  loading: boolean,
  columns: ListProps<ColumnProps>,
  posts: ListProps<PostProps>,
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
const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }) => {
  const { data } = await axios(url, { ...config })
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    currentPost: {} as PostProps,
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: {},
    posts: {},
    user: {
      isLogin: false
    }
  },
  mutations: {
    deletePost (state, { data }) {
      delete state.posts[data._id]
    },
    updatePost (state, { data }) {
      state.posts[data._id] = data
    },
    fetchPost (state, rowData) {
      state.currentPost = rowData.data // 暂不使用对象形式，excerpt和content内容不一致 刷新也会丢失数据
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    setLoading (state, status) {
      state.loading = status
    },
    createPost (state, newpost) {
      state.posts[newpost._id] = newpost
    },
    fetchColumns (state, rowData) {
      state.columns = arrToObjt(rowData.data.list)
    },
    fetchColumn (state, rowData) {
      state.columns[rowData._id] = rowData.data
    },
    fetchPosts (state, rowData) {
      state.posts = arrToObjt(rowData.data.list)
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
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    deletePost ({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    },
    fetchPost ({ commit }, cid) {
      return getAndCommit(`/posts/${cid}`, 'fetchPost', commit)
    },
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
    getColumns: (state) => objtToArray(state.columns),
    getColumnById: (state) => (id: string) => state.columns[id],
    getPostsByCid: state => (cid: string) => objtToArray(state.posts),
    getCurrentPost: state => (id: string) => state.posts[id]
  }
})
export default store
