import { createStore, Part, SetStoreFunction } from 'solid-js/store'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { ProtoForm } from './Types'
import { asyncValidation, syncValidation } from './Validate'
import { get, nameToPath } from './ObjectUtils'
import { createInitialErrors } from './CreateInitialErrors'

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

   _validate()

   function _validate() {
      const _errors = syncValidation(valuesState, validationSchema)
      _errors.forEach(err => {
         const path = nameToPath(err.path)
         setErrorsState(...path, err.message)
      })
   }

   function _onInputHandle(e: any) {
      const path = nameToPath(e.target.name)
      const value = parseInputValue(e)
      setValuesState<any>(...path, value as any)
      asyncValidation(valuesState, validationSchema)
         .then(resp => setErrorsState(...path, resp))
         .catch(err => setErrorsState(...path, err))
   }

   function _onBlurHandle(e: any) {
      const path = nameToPath(e.target.name)
      setErrorsState(...path, 'any error')
      setTouchedState<any>(...path, true)
   }

   const setValues: SetStoreFunction<T['initialValues']> = (...args: any[]) => {
      setValuesState(...(args as [Part<T>]))
      _validate()
   }

   const setErrors: SetStoreFunction<T['initialValues']> = (...args: any[]) => {
      setErrorsState(...(args as [Part<T>]))
      _validate()
   }

   const setTouched: SetStoreFunction<T['initialValues']> = (
      ...args: any[]
   ) => {
      setTouchedState(...(args as [Part<T>]))
      _validate()
   }

   function register(name: string, type: string) {
      const value = get(valuesState, name)
      return {
         onInput: _onInputHandle,
         onBlur: _onBlurHandle,
         name,
         type,
         value
      }
   }

   //createEffect(() => _onInit())

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
