import { defineStore } from 'pinia'
import { ColumnProps, ResponseType } from '@/store/store'
import { ref, computed } from 'vue'
import axios from 'axios'
interface TestProps {
  data: ColumnProps[],
  total: number
}
// 最好使用use开头
// 用id(即test)来连接store的vue-tools
export const useTestStore = defineStore('test', {
  state: ():TestProps => {
    return {
      data: [],
      total: 10
    }
  },
  actions: {
    increaseTotal () {
      this.total++
    },
    async fetchColumns (params: any = {}) {
      const { currentPage = 1, pageSize = 10 } = params
      const { data } = await axios.get<ResponseType<{ count: number, list: ColumnProps[]}>>(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`)
      const { count, list } = data.data
      this.$patch({
        total: count,
        data: list
      })
      return list
    }
  },
  getters: {
    doubleCount: (state) => state.total * 2,
    // 常规函数必须要规定类型
    doubleCountPlusOne (): number {
      // 自动补全 ✨
      return this.doubleCount + 1
    },
    getDataById: (state) => (id: string) => state.data.find(column => column._id === id)
  }
})
// setup写法
export const useTest2Store = defineStore('test2', () => {
  const total = ref(0)
  const data = ref<ColumnProps[]>([])
  const doubleCount = computed(() => total.value * 2)
  const fetchColumns = async (params: any = {}) => {
    const { currentPage = 1, pageSize = 10 } = params
    const { data: rowData } = await axios.get<ResponseType<{ count: number, list: ColumnProps[]}>>(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`)
    const { count, list } = rowData.data
    total.value = count
    data.value = list
  }
  return {
    total,
    data,
    doubleCount,
    fetchColumns
  }
})
