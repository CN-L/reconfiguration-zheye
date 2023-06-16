import { defineStore } from 'pinia'
import axios from 'axios'
import { ImageProps, ResponseType, ListDictType, ListResType } from '@/store/utils'
import { arrToObjt, objtToArray } from '@/help'
export interface ColumnsProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface GlobalColumnsProps {
  data: ListDictType<ColumnsProps>
  currentPage: number
  total: number
}
export const useColumnStore = defineStore('column', {
  state: (): GlobalColumnsProps => {
    return {
      data: {},
      currentPage: 0,
      total: 0
    }
  },
  actions: {
    async fetchColumns (params: any = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      if (this.currentPage < currentPage) {
        const { data } = await axios.get<ListResType<ColumnsProps>>(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`)
        const { count, list } = data.data
        this.$patch({
          currentPage,
          total: count,
          data: { ...this.data, ...arrToObjt(list) }
        })
      }
    },
    async fetchColumn (cid: string) {
      const cIdArr = Object.keys(this.data)
      if (!cIdArr.includes(cid)) {
        const { data: rowData } = await axios.get<ResponseType<ColumnsProps>>(`/columns/${cid}`)
        const { data } = rowData
        this.data[data._id] = data
      }
    }
  },
  getters: {
    getColumn: (state) => {
      return objtToArray(state.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.data[id]
    }
  }
})
