import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps } from '@/testData'
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
export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: Iuser
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
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
    }
  },
  getters: {
    biggerColumnlen: (state) => state.columns.filter(c => c.id > 2).length,
    getColumnById: (state) => (id: number) => state.columns.find(c => c.id === id),
    getPostsByCid: state => (cid: number) => state.posts.filter(post => post.columnId === cid)
  }
})
export default store
