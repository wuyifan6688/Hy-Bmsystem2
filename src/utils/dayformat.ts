import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言
export default function dayFormat(
  day: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs.utc(day).utcOffset(8).format(format)
}
