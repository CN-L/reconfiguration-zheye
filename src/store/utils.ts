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
