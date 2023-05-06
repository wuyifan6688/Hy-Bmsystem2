import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: {
    requestSuccessFn?: (config: any) => any
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: T) => T
    responseFailureFn?: (err: any) => any
  }
}
