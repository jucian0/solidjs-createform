import { Schema, ValidationError } from 'yup'

type ErrorList = ValidationError['inner']

export async function asyncValidation<T>(values: T, schema?: Schema<T>) {
   return new Promise(async (resolve, reject) => {
      try {
         await schema?.validate(values, { abortEarly: true })
         resolve('')
      } catch (err) {
         if (err instanceof ValidationError) {
            reject(String(err.message))
         }
      }
   })
}

export function syncValidation<T>(values: T, schema?: Schema<T>): ErrorList {
   try {
      schema?.validateSync(values, { abortEarly: false })
   } catch (err) {
      if (err instanceof ValidationError) {
         return err.inner
      }
   }
   return []
}
