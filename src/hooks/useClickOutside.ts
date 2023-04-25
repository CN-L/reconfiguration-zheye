import { ref, onMounted, onUnmounted, Ref } from 'vue'
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      // 类型断言e.target是个htmlElement类型
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
// export { useClickOutside }
export default useClickOutside
