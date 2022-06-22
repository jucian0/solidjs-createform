import { createStore } from 'solid-js/store'
import { FormBuilder } from './Types'

export const formBuild: FormBuilder = protoForm => {
   const formState = createStore({
      protoForm
   })

   return {}
}
