import { ColumnProps } from '@/store/store'
export function generateFitUrl (column: ColumnProps, width: number, height: number) {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}
interface ICondition {
  format?: string[],
  size?: number
}
type ErrorType = 'size' | 'format' | null
// 上传前类型检查
export function beforeUploadCheck (file: File, condition: ICondition) {
  const { format, size } = condition
  const isVaildFormat = format ? format.includes(file.type) : true
  const isVaildSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isVaildFormat) {
    error = 'format'
  }
  if (!isVaildSize) {
    error = 'size'
  }
  return {
    passed: isVaildFormat && isVaildFormat,
    error
  }
}
