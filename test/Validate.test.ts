import { syncValidation } from '../src/Validate'
import * as yup from 'yup'

describe('Validate', () => {
   it('should be a function', () => {
      expect(typeof syncValidation).toBe('function')
   })

   it('should return an object', () => {
      const schema = yup.object({})
      expect(typeof syncValidation({}, schema, {})).toBe('object')
   })

   it('should return an empty object if no errors', () => {
      const schema = yup.object({})
      expect(syncValidation({}, schema, {})).toEqual({})
   })

   it('should return an object with errors if errors', () => {
      const schema = yup.object({
         name: yup.string().required('Name is required')
      })
      expect(syncValidation({ name: '' }, schema, {})).toEqual({
         name: 'Name is required'
      })
   })

   it('should throw if schema is not a valid yup schema', () => {
      expect(() => {
         syncValidation({}, {} as any, {})
      }).toThrowError('Schema is not a valid yup schema')
   })
})
