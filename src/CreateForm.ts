import { createStore } from 'solid-js/store'
import { syncValidate } from './Validate'
import * as Dot from './ObjectUtils'
import { Form, FormGroup } from './Types'
import { evaluateForm } from './EvaluateForm'
import { nameToPath } from './Utils'
import { getValues } from './GetValues'

export function createForm<T>(initialState: FormGroup<T>): Form<T> {
   const initialForm = evaluateForm(initialState)
   //console.log(initialForm)
   // const [state, setForm] = createStore(initialForm)

   // function register(name: string, type = 'text') {
   //   const { value, schema } = Dot.get(initialForm, name)
   //   const inputValueType =
   //     type === 'checkbox' ? 'checked' : type === 'radio' ? 'selected' : 'value'

   //   const path = nameToPath(name)

   //   return {
   //     onInput: (e: any) => {
   //       const value = e.target.value
   //       setForm(...path, {
   //         value,
   //         error: schema ? syncValidate(value, schema) : '',
   //         pristine: false,
   //         touched: true
   //       })
   //     },
   //     onBlur: () => {
   //       setForm(...path, {
   //         ...state[name],
   //         touched: true
   //       })
   //     },
   //     [inputValueType]: value,
   //     type
   //   }
   // }

   // function reset() {
   //   setForm(initialForm)
   // }

   // function setValue(name: string, value: any) {
   //   const path = nameToPath(name)
   //   setForm(...path, state => ({
   //     ...state,
   //     value
   //     // error: state.schema ? syncValidate(value, state.schema) : ''
   //   }))
   // }

   // function resetValue(name: string) {
   //   const path = nameToPath(name)
   //   setForm(...path, state => ({
   //     value: Dot.get(initialForm, name),
   //     error: '',
   //     touched: false,
   //     pristine: true
   //   }))
   // }

   // function resetError(name: string) {
   //   const path = nameToPath(name)
   //   setForm(...path, state => ({
   //     ...state,
   //     error: ''
   //   }))
   // }

   // function setError(name: string, error: any) {
   //   const path = nameToPath(name)
   //   setForm(...path, state => ({
   //     ...state,
   //     error
   //   }))
   // }

   // function resetTouched(name: string) {
   //   const path = nameToPath(name)
   //   setForm(...path, state => ({
   //     ...state,
   //     touched: false
   //   }))
   // }

   // function setTouched(name: string) {
   //   const path = nameToPath(name)
   //   setForm(...path, state => ({
   //     ...state,
   //     touched: true
   //   }))
   // }

   // function handleSubmit(fn: (form: T) => void) {
   //   return (e: any) => {
   //     e.preventDefault()
   //     // const values = getValues(state, {})
   //     // fn(values)
   //   }
   // }

   return initialForm
}
