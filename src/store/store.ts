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
interface GlobalColumns {
  data: ListProps<ColumnProps>,
  isLoaded: boolean,
  total: number
}
interface GlobalPosts {
  data: ListProps<PostProps>,
  isLoadedColumns: string[]
}
export interface GlobalDataProps {
  currentPost: PostProps,
  error: GlobalErrorProps,
  token: string,
  loading: boolean,
  columns: GlobalColumns,
  posts: GlobalPosts,
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
const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, { ...config })
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
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
    columns: {
      data: {},
      isLoaded: false,
      total: 0
    },
    posts: { data: {}, isLoadedColumns: [] },
    user: {
      isLogin: false
    }
  },
  mutations: {
    deletePost (state, { data }) {
      delete state.posts.data[data._id]
    },
    updatePost (state, { data }) {
      state.posts.data[data._id] = data
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
      state.posts.data[newpost._id] = newpost
    },
    fetchColumns (state, rowData) {
      const { data } = state.columns
      const { list, count } = rowData.data
      state.columns = {
        data: { ...data, ...arrToObjt(list) },
        isLoaded: true,
        total: count
      }
    },
    fetchColumn (state, rowData) {
      state.columns.data[rowData._id] = rowData.data
    },
    fetchPosts (state, { data: rowData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObjt(rowData.data.list) }
      state.posts.isLoadedColumns.push(columnId)
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
    fetchPost ({ state, commit }, cid) {
      const currentPost = state.posts.data[cid]
      if (!currentPost || !currentPost.content) {
        return getAndCommit(`/posts/${cid}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
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
    async fetchColumns ({ state, commit }, params) {
      const { currentPage = 1, pageSize = 5 } = params
      // if (!state.columns.isLoaded) {
      asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      // }
    },
    async fetchColumn ({ commit, state }, cid) {
      if (!state.columns.data[cid]) {
        return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    async fetchPosts ({ commit, state }, cid) {
      if (!state.posts.isLoadedColumns.includes(cid)) {
        return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    // 组合登陆和获取当前用户信息的acions
    loginAndFetch ({ dispatch }, playLoad) {
      return dispatch('login', playLoad).then(() =>
        dispatch('fetchCurrentUser')
      )
    }
  },
  getters: {
    getColumns: (state) => objtToArray(state.columns.data),
    getColumnById: (state) => (id: string) => state.columns.data[id],
    getPostsByCid: state => (cid: string) => {
      return objtToArray(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: state => (id: string) => state.posts.data[id]
  }
})
export default store
