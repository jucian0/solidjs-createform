import { formControl } from './FormControl'
import { FormGroup } from './Types'

export const formGroup: FormGroup = form => {
   const state = Object.assign(form, {})

   function evaluate(partial: any) {
      for (const key in partial) {
         if (partial[key] instanceof Array) {
            partial[key] = formControl(partial[key])
         } else if (!partial[key].hasOwnProperty('value')) {
            partial[key] = evaluate(partial[key])
         }
      }
      return partial
   }

   return evaluate(state)
}
