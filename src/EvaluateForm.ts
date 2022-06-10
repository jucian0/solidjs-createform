import { createForm } from './CreateForm'
import { InputForm, State } from './Types'
import { syncValidate } from './Validate'

export function evaluateForm<T>(
   form: InputForm<T> | typeof createForm,
   next = {}
): State<T> {
   for (const key in form) {
      if (form[key] instanceof Array) {
         if (form[key].length === 1) {
            next[key] = {
               value: form[key][0],
               error: '',
               touched: false,
               schema: null,
               pristine: true
            }
            return next as State<T>
         }

         next[key] = {
            value: form[key][0],
            error: syncValidate(form[key][0], form[key][1]),
            schema: form[key][1],
            pristine: true,
            touched: false
         }
         return next as State<T>
      } else if (form[key] instanceof Object) {
         return evaluateForm(form[key], next)
      }
      next[key] = {
         value: form[key],
         error: '',
         touched: false,
         pristine: true,
         schema: null
      }

      return next as State<T>
   }
   return next as State<T>
}
