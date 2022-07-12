import { createStore } from 'solid-js/store'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { ProtoForm } from './Types'
import { syncValidation } from './Validate'
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

   function _validate(values: T['initialValues']) {
      const _errors = syncValidation(values, validationSchema, initialErrors)
      setErrorsState(_errors)
   }

   _validate(initialValues)

   function _onInputHandle(e: any) {
      const value = parseInputValue(e)
      const next = set(valuesState, e.target.name, value)
      setValuesState(next)

      _validate(next)
   }

   function _onBlurHandle(e: any) {
      const path = nameToPath(e.target.name)
      setTouchedState<any>(...path, true)
   }

   function setValues(pathOrValue: string | T['initialValues'], partial?: any) {
      if (typeof pathOrValue === 'string') {
         const next = set(valuesState, pathOrValue, partial)
         _validate(next)
         return setValuesState(next)
      }
      _validate(pathOrValue)
      return setValuesState(pathOrValue)
   }

   function setErrors(pathOrValue: string | T['initialValues'], partial?: any) {
      if (typeof pathOrValue === 'string') {
         const next = set(errorsState, pathOrValue, partial)
         return setErrorsState(next)
      }
      return setErrorsState(pathOrValue)
   }

   function setTouched(
      pathOrValue: string | T['initialValues'],
      partial?: any
   ) {
      if (typeof pathOrValue === 'string') {
         const next = set(errorsState, pathOrValue, partial)
         return setTouchedState(next)
      }
      return setTouchedState(pathOrValue)
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

   function handleSubmit(callbackFn: (values: T['initialValues']) => void) {
      return (event: any) => {
         event.preventDefault()
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
