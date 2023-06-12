import { defineStore } from 'pinia'
import { ColumnProps } from '@/store/store'
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
