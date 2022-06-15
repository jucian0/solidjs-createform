import { formControl } from './FormControl'
import { FormGroup, State } from './Types'

export function formGroup<T extends FormGroup<T>>(
   form: FormGroup<T>,
   state = Object.assign(form)
): State<T> {
   for (const key in form) {
      if (form[key] instanceof Array) {
         state[key] = formControl<T>(form[key] as any)
      } else if (!(form[key] as any).hasOwnProperty('value')) {
         state[key] = formGroup(form[key], state[key])
      }
   }
   return state as State<T>
}
