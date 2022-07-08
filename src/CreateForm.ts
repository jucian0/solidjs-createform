import { createStore } from 'solid-js/store'
import { nameToPath } from './NameToPath'
import { parseInputValue } from './ParseInputValue'
import { createInitialTouched } from './CreateInitialTouched'
import { ProtoForm } from './Types'
import { syncValidation } from './Validate'
import { get } from './ObjectUtils'

export function createForm<T extends ProtoForm<T['initialValues']>>(
   protoForm: T
) {
   const { validationSchema, initialValues } = protoForm
   const [errors, setErrors] = createStore(
      syncValidation(initialValues, validationSchema)
   )
   const [values, setValues] = createStore(initialValues)
   const [touched, setTouched] = createStore(
      createInitialTouched(structuredClone(initialValues))
   )

   function _onInputHandle(e: any) {
      const path = nameToPath(e.target.name)
      const value = parseInputValue(e)
      setValues<any>(...path, value as any)
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
