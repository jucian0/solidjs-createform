import { createStore } from 'solid-js/store'
import { ProtoForm } from './Types'
import { syncValidation } from './Validate'

export function createForm<T extends ProtoForm<T>>(protoForm: T) {
   const { validation, values } = protoForm
   const errors = createStore(syncValidation(values, validation))
}
