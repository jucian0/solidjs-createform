import { createStore, unwrap } from 'solid-js/store'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { Errors, Form, ProtoForm, Touched, Values } from './Types'
import { syncValidation } from './Validate'
import { clone, get, set } from './ObjectUtils'
import { createInitialErrors } from './CreateInitialErrors'

export function createForm<T extends ProtoForm<T>>(protoForm: T): Form<T> {
   const { validationSchema, initialValues } = protoForm
   const protoInitialErrors = createInitialErrors(initialValues)
   const initialErrors = _validate(initialValues)
   const initialTouched = createInitialTouched(initialValues)

   const [errorsState, setErrorsState] = createStore<Errors<Values<T>>>(
      clone(protoInitialErrors)
   )
   const [touchedState, setTouchedState] = createStore<Touched<Values<T>>>(
      clone(initialTouched)
   )
   const [valuesState, setValuesState] = createStore<Values<T>>(
      clone(initialValues)
   )

   function _validate(values: Values<T>) {
      return syncValidation(values, validationSchema, protoInitialErrors)
   }

   function _onInputHandle(e: any) {
      const value = parseInputValue(e)
      const next = set(valuesState, e.target.name, value)
      setValuesState(next)
      setErrorsState(_validate(next))
   }

   function _onBlurHandle(e: any) {
      const next = set(touchedState, e.target.name, true)
      setTouchedState(next)
   }

   function setValues(pathOrValue: string | Values<T>, partial?: any) {
      if (typeof pathOrValue === 'string') {
         const next = set(valuesState, pathOrValue, partial)
         setErrorsState(_validate(next))
         return setValuesState(next)
      }
      setErrorsState(_validate(pathOrValue))
      return setValuesState(pathOrValue)
   }

   function setErrors(pathOrValue: string | Errors<Values<T>>, partial?: any) {
      if (typeof pathOrValue === 'string') {
         const next = set(errorsState, pathOrValue, partial)
         return setErrorsState(next)
      }
      return setErrorsState(pathOrValue)
   }

   function setTouched(
      pathOrValue: string | Touched<Values<T>>,
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

   function handleSubmit(callbackFn: (values: Values<T>) => void) {
      return (event: any) => {
         event.preventDefault()
         callbackFn(unwrap(valuesState))
      }
   }

   function resetForm() {
      setValuesState(initialValues)
      setErrorsState(initialErrors)
      setTouchedState(initialTouched)
   }

   function resetValues() {
      setValuesState(initialValues)
   }

   function resetErrors() {
      setErrorsState(initialErrors)
   }

   function resetTouched() {
      setTouchedState(initialTouched)
   }

   setErrorsState(_validate(initialValues))

   return {
      values: valuesState,
      errors: errorsState,
      touched: touchedState,
      register,
      setValues,
      setErrors,
      setTouched,
      handleSubmit,
      resetForm,
      resetValues,
      resetErrors,
      resetTouched
   }
}
