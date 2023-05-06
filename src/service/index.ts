import HYRequest from './request'
import { TIME_OUT, BASE_URL } from './config/index'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      config.headers!.Authorization = //好像有点问题，headers应该要定义
        'Bearer ' + localCache.getCache(LOGIN_TOKEN)
      return config
    }
  }
})
export default hyRequest
