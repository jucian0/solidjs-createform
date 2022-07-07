import { NativeValue } from './Types'

export function parseInputValue(e: any): NativeValue {
   const type = e.target.type
   const value = e.target.value

   if (type === 'number' || type === 'range') {
      return Number(value)
   } else if (type === 'checkbox') {
      return Boolean(e.target.checked)
   }

   return String(value)
}
