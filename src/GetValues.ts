import { State } from './Types'

export function getValues<T>(form: State<T>, values = {}): T {
   for (const key in form) {
      const data = form[key]
      if (data?.value) {
         values[key] = data.value
      } else {
         values[key] = getValues(data, values)
      }
   }
   return values as T
}
