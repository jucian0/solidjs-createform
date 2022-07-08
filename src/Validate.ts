import { Schema, ValidationError } from 'yup'

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
