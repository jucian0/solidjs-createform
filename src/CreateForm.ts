import { createStore } from 'solid-js/store'
import { nameToPath } from './NameToPath'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { ProtoForm } from './Types'
import { asyncValidation, syncValidation } from './Validate'
import { get } from './ObjectUtils'
import { createInitialErrors } from './CreateInitialErrors'
import { createEffect } from 'solid-js'

export function createForm<T extends ProtoForm<T['initialValues']>>(
   protoForm: T
) {
   const { validationSchema, initialValues } = protoForm
   const [errors, setErrors] = createStore(
      createInitialErrors(structuredClone(initialValues))
   )
   const [values, setValues] = createStore(initialValues)
   const [touched, setTouched] = createStore(
      createInitialTouched(structuredClone(initialValues))
   )

   function _onInit() {
      const _errors = syncValidation(values, validationSchema)
      _errors.forEach(err => {
         const path = nameToPath(err.path)
         setErrors(...path, err.message)
      })
   }

   function _onInputHandle(e: any) {
      const path = nameToPath(e.target.name)
      const value = parseInputValue(e)
      setValues<any>(...path, value as any)
      asyncValidation(values, validationSchema)
         .then(resp => setErrors(...path, resp))
         .catch(err => setErrors(...path, err))
   }

   function _onBlurHandle(e: any) {
      const path = nameToPath(e.target.name)
      setErrors(...path, 'any error')
      setTouched<any>(...path, true)
   }

   function register(name: string, type: string) {
      const value = get(values, name)
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
      values,
      errors,
      register,
      setValues,
      setErrors,
      setTouched,
      touched
   }
}
