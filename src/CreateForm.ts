import { createStore, Part, SetStoreFunction } from 'solid-js/store'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { ProtoForm } from './Types'
import { asyncValidation, syncValidation } from './Validate'
import { clone, get, nameToPath, set } from './ObjectUtils'
import { createInitialErrors } from './CreateInitialErrors'

export function createForm<T extends ProtoForm<T['initialValues']>>(
   protoForm: T
) {
   const { validationSchema, initialValues } = protoForm
   const initialErrors = createInitialErrors(initialValues)
   const initialTouched = createInitialTouched(initialValues)

   const [errorsState, setErrorsState] = createStore(clone(initialErrors))
   const [touchedState, setTouchedState] = createStore(clone(initialTouched))
   const [valuesState, setValuesState] = createStore(clone(initialValues))

   const _validate = (values: T['initialValues']) => {
      const _errors = syncValidation(values, validationSchema, initialErrors)
      setErrorsState(_errors)
   }

   _validate(initialValues)

   const _onInputHandle = (e: any) => {
      const value = parseInputValue(e)
      const next = set(valuesState, e.target.name, value)
      setValuesState(next)

      _validate(next)
   }

   const _onBlurHandle = (e: any) => {
      const path = nameToPath(e.target.name)
      setTouchedState<any>(...path, true)
   }

   const setValues = (
      pathOrValue: string | T['initialValues'],
      partial?: any
   ) => {
      if (typeof pathOrValue === 'string') {
         const next = set(valuesState, pathOrValue, partial)
         _validate(next)
         return setValuesState(next)
      }
      _validate(pathOrValue)
      return setValuesState(pathOrValue)
   }

   const setErrors: SetStoreFunction<T['initialValues']> = (...args: any[]) => {
      setErrorsState(...(args as [Part<T>]))
   }

   const setTouched: SetStoreFunction<T['initialValues']> = (
      ...args: any[]
   ) => {
      setTouchedState(...(args as [Part<T>]))
   }

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

   const handleSubmit = (callbackFn: (values: T['initialValues']) => void) => {
      return (event: any) => {
         event.preventDefault()
         _validate(valuesState)
         callbackFn(valuesState)
      }
   }

   return {
      values: valuesState,
      errors: errorsState,
      touched: touchedState,
      register,
      setValues,
      setErrors,
      setTouched,
      handleSubmit
   }
}
