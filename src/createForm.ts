import { formGroup } from './FormGroup'
import { FormGroup } from './Types'

type Form<T> = {
   state: T
}

type Former = (group: FormGroup) => ReturnType<FormGroup>

type CreateForm = <T>(former: Former) => Form<T>

export const createForm: CreateForm = former => {
   const protoForm = former(formGroup)

   return {
      state: protoForm
   }
}
