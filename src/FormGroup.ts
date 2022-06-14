import { formControl } from './FormControl'
import { FormControl, FormGroup, State } from './Types'

export function formGroup<T>(
   form: FormGroup<T>,
   state = Object.assign(form)
): State<T> {
   for (const key in form) {
      if (form[key] instanceof Array) {
         state[key] = formControl(form[key] as FormControl)
      } else if (!form[key].hasOwnProperty('value')) {
         state[key] = formGroup(form[key] as FormGroup<T>, state[key])
      }
   }
   return state as State<T>
}
