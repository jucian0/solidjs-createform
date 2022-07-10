import { createStore, Part, SetStoreFunction } from 'solid-js/store'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { ProtoForm } from './Types'
import { asyncValidation, syncValidation } from './Validate'
import { get, nameToPath } from './ObjectUtils'
import { createInitialErrors } from './CreateInitialErrors'
import { createEffect, from, observable } from 'solid-js'

export function createForm<T extends ProtoForm<T['initialValues']>>(
   protoForm: T
) {
   const { validationSchema, initialValues } = protoForm
   const [errorsState, setErrorsState] = createStore(
      createInitialErrors(structuredClone(initialValues))
   )
   const [valuesState, setValuesState] = createStore(initialValues)
   const [touchedState, setTouchedState] = createStore(
      createInitialTouched(structuredClone(initialValues))
   )

   const obsv$ = from(state => {})

   const _validate = () => {
      const _errors = syncValidation(valuesState, validationSchema)
      _errors.forEach(err => {
         const path = nameToPath(err.path)
         setErrorsState(...path, err.message)
      })
   }

   const _onInputHandle = (e: any) => {
      const path = nameToPath(e.target.name)
      const value = parseInputValue(e)
      setValuesState<any>(...path, value as any)
      asyncValidation(valuesState, validationSchema)
         .then(resp => setErrorsState(...path, resp))
         .catch(err => setErrorsState(...path, err))
   }

   const _onBlurHandle = (e: any) => {
      const path = nameToPath(e.target.name)
      setTouchedState<any>(...path, true)
   }

   const setValues: SetStoreFunction<T['initialValues']> = (...args: any[]) => {
      setValuesState(...(args as [Part<T>]))
   }

   const setErrors: SetStoreFunction<T['initialValues']> = (...args: any[]) => {
      setErrorsState(...(args as [Part<T>]))
   }

   const setTouched: SetStoreFunction<T['initialValues']> = (
      ...args: any[]
   ) => {
      setTouchedState(...(args as [Part<T>]))
   }

   //   createEffect(() => {
   //     const data = valuesState
   //     _validate()
   //   })

   const register = (name: string, type: string) => {
      const value = get(valuesState, name)
      return {
         onInput: _onInputHandle,
         onBlur: _onBlurHandle,
         name,
         type,
         value
      }
   }

   _validate()

   return {
      values: valuesState,
      errors: errorsState,
      touched: touchedState,
      register,
      setValues,
      setErrors,
      setTouched
   }
}
