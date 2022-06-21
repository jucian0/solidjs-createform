import { syncValidate } from './Validate'

export function formControl<T>(control: any): any {
   const baseProps = {
      touched: false,
      pristine: true,
      value: control[0]
   }

   if (control instanceof Array) {
      if (control.length === 1) {
         return {
            ...baseProps
         }
      }

      return {
         ...baseProps,
         error: syncValidate(control[0], control[1]),
         schema: control[1]
      }
   }

   return {
      ...baseProps,
      value: control as T
   }
}
