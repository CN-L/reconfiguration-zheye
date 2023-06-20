import { defineStore } from 'pinia'
import axios from 'axios'
import { ResponseType, ListResType, ListDictType, ImageProps, ListReqType } from '@/store/utils'
import { arrToObjt, objtToArray } from '@/help'
import { UserProps } from './user'

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
export interface GlobalPostProps {
  data: ListDictType<PostProps>;
  loadedColumn: ListDictType<{total: number; currentPage: number}>
}
export const usePostStore = defineStore('post', {
  state: (): GlobalPostProps => {
    return {
      data: {},
      loadedColumn: {}
    }
  },
  actions: {
    async fetchPosts (params: ListReqType = {}) {
      const { cid = '', currentPage = 1, pageSize = 5 } = params
      const { loadedColumn } = this
      // 根本没有加载过这个专栏的列表
      // 已经加载的页数要小于希望加载的页码
      const loadedCurentPage = (loadedColumn[cid] && loadedColumn[cid].currentPage)
      if (!Object.keys(loadedColumn).includes(cid) || loadedCurentPage < currentPage) {
        const { data } = await axios.get<ListResType>(`/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`)
        const { count, list } = data.data
        this.data = { ...this.data, ...arrToObjt(list) }
        this.loadedColumn[cid] = {
          total: count,
          currentPage
        }
      }
    },
    async fetchPost (id: string) {
      const certainPost = this.data[id]
      if (!certainPost || !certainPost.content) {
        const { data: rawData } = await axios.get<ResponseType<PostProps>>(`/posts/${id}`)
        const { data } = rawData
        this.data[data._id as string] = data
      }
    },
    async createPost (id: string, payload: PostProps) {
      const { data: rawData } = await axios.post<ResponseType<PostProps>>(`/posts/${id}`, payload)
      const { data } = rawData
      this.data[data._id as string] = data
    },
    async deletePost (id: string) {
      const { data: rowData } = await axios.delete<ResponseType<PostProps>>(`/posts/${id}`)
      const { data } = rowData
      delete this.data[data._id as string]
      return data
    },
    async updatePost (id: string, payload: PostProps) {
      const { data: rowData } = await axios.patch<ResponseType<PostProps>>(`/posts/${id}`, payload)
      const { data } = rowData
      this.data[data._id as string] = data
    }
  },
  getters: {
    getCurrentPost: (state) => (cid: string) => {
      return state.data[cid]
    },
    getPostsCountByCid: (state) => (cid: string) => {
      if (state.loadedColumn[cid]) {
        return state.loadedColumn[cid].total
      } else {
        return 0
      }
    },
    getPostsCurrentPageByCid: (state) => (cid: string) => {
      if (state.loadedColumn[cid]) {
        return state.loadedColumn[cid].currentPage
      } else {
        return 0
      }
    },
    getPostsByCid: (state) => (cid: string) => {
      return objtToArray(state.data).filter(post => post.column === cid).sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      })
    }
  }
})
