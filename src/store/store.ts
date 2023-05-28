import { createStore } from 'vuex'
import { testData, testPosts } from '@/testData'
import axios from 'axios'
interface Iuser {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
interface ImageProps {
  _id?: string,
  url?: string,
  createdAt?: string
}
export interface ColumnProps {
  _id: number,
  title: string,
  avatar?: ImageProps,
  description: string
}
export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: Iuser
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: testPosts,
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
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    }
  },
  getters: {
    biggerColumnlen: (state) => state.columns.filter(c => c._id > 2).length,
    getColumnById: (state) => (id: number) => state.columns.find(c => c._id === id),
    getPostsByCid: state => (cid: number) => state.posts.filter(post => post.columnId === cid)
  }
})
export default store
