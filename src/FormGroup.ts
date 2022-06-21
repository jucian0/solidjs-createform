import { formControl } from './FormControl'

export function formGroup(form: any): any {
   const state = Object.assign(form, {})

   function evaluate(partial: any) {
      for (const key in partial) {
         if (partial[key] instanceof Array) {
            partial[key] = formControl(partial[key])
         } else if (!(partial[key] as any).hasOwnProperty('value')) {
            partial[key] = evaluate(partial[key])
         }
      }
      return partial
   }

   return evaluate(state)
}
