import { createStore } from 'solid-js/store'
import { syncValidate } from './Validate'
// import { CreateFormArgs, Form, KeyOf } from './Types'
import * as Dot from './ObjectUtils'
import { Form, InputForm, State } from './Types'
import { evaluateForm } from './EvaluateForm'
// import { asyncValidate } from './Validate'

// const defaultValues = {
//    initialValues: {},
//    initialErrors: {},
//    initialTouched: {}
// }

// /**
//  * createform function create a form Store and return a hook that can be used to manage the form state.
//  * @param args createformArgs type that contains the initial values of form, initial errors of form, initial touched of form,
//  * @returns {function(*): *} a hook that can be used to manage the form state.
//  **/
// export function createForm<T extends CreateFormArgs<T['initialValues']>>(
//    args: T
// ) {
//    const initialState = { ...defaultValues, ...args }
//    const restore = Dot.clone(initialState)

//    /**
//     * This is the store of the form,
//     * it is an object that contains the values of form,
//     * errors of form,
//     * touched of form.
//     **/
//    const [form, setForm] = createStore({
//       values: initialState.initialValues,
//       errors: initialState.initialErrors,
//       touched: initialState.initialTouched,

//       setValue: (field: string, value: string) => {
//          const next = Dot.set(form.values, field, value)
//          setForm('values', next)
//       },
//       setError: (field: string, value: string) => {
//          const next = Dot.set(form.errors, field, value)
//          setForm('errors', next)
//       },
//       setTouched: (field: string, value: boolean) => {
//          const next = Dot.set(form.touched, field, value)
//          setForm('touched', next)
//       }
//    })

//    /**
//     * This is the hook that can be used to manage the form state.
//     **/

//    function register(name: string, type = 'text') {
//       const value = Dot.get(form.values, name)

//       const inputValueType =
//          type === 'checkbox'
//             ? 'checked'
//             : type === 'radio'
//             ? 'selected'
//             : 'value'

//       return {
//          onInput: (e: any) => {
//             const value = e.target.value
//             form.setValue(name, value)
//             validate(form.values, name)
//          },
//          onBlur: () => {
//             form.setTouched(name, true)
//          },
//          [inputValueType]: value,
//          type
//       }
//    }

//    async function validate(values: T['initialValues'], field: string) {
//       try {
//          await asyncValidate(values, initialState.validationSchema)
//          form.setError(field, '')
//       } catch (e) {
//          form.setError(field, Dot.get(e, field))
//       }
//    }

//    return {
//       register,
//       setFieldValue: form.setValue,
//       setFIeldError: form.setError,
//       setFieldTouched: form.setTouched,
//       state: {
//          ...form
//       }
//    }
// }

export function createForm<T>(initialState: InputForm<T>): Form<T> {
   const initialForm = evaluateForm(initialState)
   const [form, setForm] = createStore(initialForm)

   function register(name: string, type = 'text') {
      const value = Dot.get(form, name).value
      const inputValueType =
         type === 'checkbox'
            ? 'checked'
            : type === 'radio'
            ? 'selected'
            : 'value'

      const { schema } = Dot.get(form, name)

      return {
         onInput: (e: any) => {
            const value = e.target.value
            setForm(name, {
               ...form[name],
               value,
               error: schema ? syncValidate(value, schema) : '',
               pristine: false,
               touched: true
            })
         },
         onBlur: () => {
            setForm(name, {
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
