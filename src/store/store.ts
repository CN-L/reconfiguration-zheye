import { createStore } from 'vuex'
import { testData, testPosts } from '@/testData'
import axios from 'axios'
interface Iuser {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
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
  columns: ColumnProps[],
  posts: PostProps[],
  user: Iuser
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Job', columnId: 1 }
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
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    },
    fetchColumn (context, cid) {
      console.log(cid, '2222')
      axios.get(`/columns/${cid}`).then(resp => {
        context.commit('fetchColumn', resp.data)
      })
    },
    fetchPosts (context, cid) {
      axios.get(`/columns/${cid}/posts`).then(resp => {
        context.commit('fetchPosts', resp.data)
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => state.columns.find(c => c._id === id),
    getPostsByCid: state => (cid: string) => state.posts.filter(post => post._id === cid)
  }
})
export default store
