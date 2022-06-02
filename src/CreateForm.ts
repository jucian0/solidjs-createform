import { createStore } from 'solid-js/store'
import { createformArgs, Form } from './Types'
import * as Dot from './ObjectUtils'
import { asyncValidate } from './Validate'

const defaultValues = {
   initialValues: {},
   initialErrors: {},
   initialTouched: {}
}

/**
 * createform function create a form Store and return a hook that can be used to manage the form state.
 * @param args createformArgs type that contains the initial values of form, initial errors of form, initial touched of form,
 * @returns {function(*): *} a hook that can be used to manage the form state.
 **/
export function createform<T extends createformArgs<T['initialValues']>>(
   args: T
): Form<T['initialValues']> {
   const initialState = { ...defaultValues, ...args }
   const restore = Dot.clone(initialState)

   /**
    * This is the store of the form,
    * it is an object that contains the values of form,
    * errors of form,
    * touched of form.
    **/
   const [state, setState] = createStore({
      values: initialState.initialValues,
      errors: initialState.initialErrors,
      touched: initialState.initialTouched,
      isValid: Dot.isEmpty(initialState.initialErrors)
   })

   /**
    * This is the hook that can be used to manage the form state.
    **/

   const { values, errors, touched, isValid } = state

   function register(name: string, type = 'text') {
      const value = Dot.get(values, name)

      const inputValueType =
         type === 'checkbox'
            ? 'checked'
            : type === 'radio'
            ? 'selected'
            : 'value'

      return {
         onInput: (e: any) => {
            const value = e.target.value
            const nextValues = Dot.set(values, name, value)
            setState(`values`, nextValues)
            validate(nextValues)
         },
         onBlur: () => {
            setState(`touched`, Dot.set(touched, name, true))
         },
         [inputValueType]: value,
         type
      }
   }

   async function validate(values: T['initialValues']) {
      try {
         await asyncValidate(values, initialState.validationSchema)
         console.log('validate')
         setState(`errors`, {})
      } catch (e) {
         console.log('invalidate')
         setState(`errors`, e)
         setState(`isValid`, false)
      }
   }

   function reset() {
      console.log(restore.initialValues)
      setState(`values`, restore.initialValues)
   }

   function resetFieldValue(name: string) {
      setState(
         `values`,
         Dot.set(values, name, Dot.get(restore.initialValues, name))
      )
   }

   function setFieldValue(name: string, value: any) {
      setState(`values`, Dot.set(values, name, value))
   }

   function resetFieldError(name: string) {
      setState(`errors`, Dot.set(errors, name, undefined))
   }

   function setFieldError(name: string, error: any) {
      setState(`errors`, Dot.set(errors, name, error))
   }

   function resetFieldTouched(name: string) {
      setState(`touched`, Dot.set(touched, name, false))
   }

   function setFieldTouched(name: string) {
      setState(`touched`, Dot.set(touched, name, true))
   }

   return {
      register,
      state,
      reset,
      resetFieldValue,
      setFieldValue,
      resetFieldError,
      setFieldError,
      resetFieldTouched,
      setFieldTouched,
      isValid
   }
}
