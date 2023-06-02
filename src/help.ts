import { ColumnProps, ImageProps, UserProps } from '@/store/store'
export function generateFitUrl (data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function addColumnAvatar (data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
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
export const arrToObjt = <T extends { _id?: string}>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as {[key: string] : T})
}

export const objtToArray = <T>(obj: {[key:string]: T}) => {
  return Object.keys(obj).map((it: string) => obj[it])
}
