import { Schema, ValidationError } from 'yup'
import { set } from './ObjectUtils'

export async function asyncValidation<T>(values: T, schema?: Schema<T>) {
   return new Promise(async (resolve, reject) => {
      try {
         await schema?.validate(values, { abortEarly: false })
         resolve({})
      } catch (err) {
         if (err instanceof ValidationError) {
            console.log(err)
            reject(err)
         }
      }
   })
}

export function syncValidation<TValues extends {}>(
   values: TValues,
   validationSchema: Schema<TValues>,
   errors: any
) {
   try {
      validationSchema?.validateSync(values, { abortEarly: false })
      return errors
   } catch (err: any) {
      return err.inner.reduce((acc: any, key: any) => {
         return set(acc, key.path, key.message)
      }, errors)
   }
}
