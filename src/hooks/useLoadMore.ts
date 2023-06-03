import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'
interface LoadParams {
  currentPage: number,
  pageSize: number
}
const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = { currentPage: 1, pageSize: 5 }) => {
  const store = useStore()
  console.log(store, 'store')
  const currentPage = ref(params.currentPage)
  const requestParams = {
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams).then(resp => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) === currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}
export default useLoadMore
