import axios from 'axios'
import type { HYRequestConfig } from './type'
import type { AxiosInstance } from 'axios'
//import type { AxiosRequestConfig } from 'axios' //本来是CreateAxiosDefaults，但是教程里面用的是这个，估计是换了新的，增加了新的特性，还不熟悉
class HYRequest {
  instance: AxiosInstance
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => error
    )
    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => err
    )
    // this.instance.interceptors.request.use(
    //   config.interceptors?.requestSuccessFn
    // )

    this.instance.interceptors.request.use(
      config?.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
