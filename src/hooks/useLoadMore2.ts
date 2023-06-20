import { Store } from 'pinia'
import { ComputedRef, computed } from 'vue'
interface LoadOptions {
  currentPage: ComputedRef<number>
  total: ComputedRef<number>
  pageSize?: number
  [key: string]: any
}
const useLoadMore = (store: Store<string, any>, actionName: string, options: LoadOptions) => {
  const { currentPage, total, pageSize = 5, ...restoptions } = options
  const requestParams = computed(() => {
    return {
      ...restoptions,
      currentPage: currentPage.value + 1,
      pageSize
    }
  })
  const loadMorePage = () => {
    store[actionName](requestParams.value)
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / pageSize) === currentPage.value
  })
  return {
    isLastPage,
    currentPage,
    loadMorePage
  }
}
export default useLoadMore
