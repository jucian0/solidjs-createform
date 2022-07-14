import { isSchema, SchemaOf } from 'yup'
import { set } from './ObjectUtils'

export function syncValidation<T extends {}>(
   values: T,
   schema: SchemaOf<T>,
   errors: any
) {
   if (schema && !isSchema(schema)) {
      throw new Error('Schema is not a valid yup schema')
   }
   try {
      schema?.validateSync(values, { abortEarly: false })
      return errors
   } catch (err: any) {
      return err.inner.reduce((acc: any, key: any) => {
         return set(acc, key.path, key.message)
      }, errors)
   }
}
