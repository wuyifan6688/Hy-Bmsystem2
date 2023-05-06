import { coordinateData } from './coordinateData'
export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const jw = coordinateData[data[i].name]
    if (jw) {
      res.push({
        name: data[i].name,
        value: jw.concat(data[i].value)
      })
    }
  }
  return res
}
