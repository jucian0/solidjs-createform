import { createStore } from 'solid-js/store'
import { syncValidate } from './Validate'
import * as Dot from './ObjectUtils'
import { Form, InputForm, State } from './Types'
import { evaluateForm } from './EvaluateForm'

export function createForm<T>(initialState: InputForm<T>): Form<T> {
   const initialForm = evaluateForm(initialState)
   const [form, setForm] = createStore(initialForm)

   function register(name: string, type = 'text') {
      const { value } = Dot.get(form, name)
      const inputValueType =
         type === 'checkbox'
            ? 'checked'
            : type === 'radio'
            ? 'selected'
            : 'value'

      const { schema } = Dot.get(form, name)
      const path = name.split('.')

      return {
         onInput: (e: any) => {
            const value = e.target.value
            setForm(...path, {
               value,
               error: schema ? syncValidate(value, schema) : '',
               pristine: false,
               touched: true
            })
         },
         onBlur: () => {
            setForm(...path, {
               ...form[name],
               touched: true
            })
         },
         [inputValueType]: value,
         type
      }
   }

   function resetForm() {
      setForm(initialForm)
   }

   return {
      register,
      form,
      resetForm
   }
}
