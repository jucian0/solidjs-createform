import { createStore } from 'solid-js/store'
import { formGroup } from './FormGroup'
import { Group } from './Types'
import { nameToPath } from './Utils'

export function createForm<T extends Group<T>>(protoform: T) {
   const [form, set] = createStore(formGroup(protoform))

   function setValue(name: string, value: any) {
      const path = nameToPath(name)
      set(...path, value)
   }

   return form
}
