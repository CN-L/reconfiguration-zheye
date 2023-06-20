export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface ResponseType<P = null> {
  code: number,
  msg: string,
  data: P;
}
export interface ListDictType<P> {
  [id: string]: P
}
export interface ListReponse<P> {
  list: P[];
  count: number;
  currentPage: number;
  pageSize: number
}
export interface ListReqType {
  currentPage?: number;
  pageSize?: number
}
export type ListResType<P = any> = ListDictType<ListReponse<P>>
