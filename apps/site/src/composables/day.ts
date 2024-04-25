import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs().format()
dayjs.locale('pt-br')

export function useDay(dateStr: string): string {
  return dayjs(dateStr).utc().format('DD-MM-YYYY')
}