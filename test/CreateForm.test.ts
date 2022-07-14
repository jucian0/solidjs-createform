import { createForm } from '../src/CreateForm'
import * as yup from 'yup'

describe('createForm', () => {
   it('should create a form', () => {
      const form = createForm({
         initialValues: {}
      })
      expect(form).toBeDefined()
   })

   it('should create a form with initial values', () => {
      const initialValues = {
         name: 'John Doe',
         age: '42'
      }
      const form = createForm({ initialValues })
      expect(form.values).toEqual(initialValues)
   })

   it('should create a form with initial errors', () => {
      const initialValues = { name: '' }
      const validationSchema = yup.object({
         name: yup.string().required('Name is required')
      })
      const form = createForm({ initialValues, validationSchema })
      expect(form.errors).toEqual({ name: 'Name is required' })
   })

   it('should create a form with initial touched', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      expect(form.touched).toEqual({ name: false })
   })
})

describe('createForm  - setValues', () => {
   it('should change all values', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setValues({ name: 'John Doe' })
      expect(form.values).toEqual({ name: 'John Doe' })
   })

   it('should change a single value', () => {
      const initialValues = { name: '', email: '' }
      const form = createForm({ initialValues })
      form.setValues('name', 'John Doe')
      expect(form.values).toEqual({ name: 'John Doe', email: '' })
   })

   it('should change a single value with nested path', () => {
      const initialValues = { name: '', address: { city: '' } }
      const form = createForm({ initialValues })
      form.setValues('address.city', 'Paris')
      expect(form.values).toEqual({ name: '', address: { city: 'Paris' } })
   })

   it('should change a single value with nested path and array index', () => {
      const initialValues = { name: '', address: { city: '', streets: [''] } }
      const form = createForm({ initialValues })
      form.setValues('address.streets.0', 'Paris')
      expect(form.values).toEqual({
         name: '',
         address: { city: '', streets: ['Paris'] }
      })
   })

   it('should change a partial value with nested path', () => {
      const initialValues = { name: '', address: { city: '', street: '' } }
      const form = createForm({ initialValues })
      form.setValues('address', { city: 'Paris', street: 'rue de la paix' })
      expect(form.values).toEqual({
         name: '',
         address: { city: 'Paris', street: 'rue de la paix' }
      })
   })

   it('should change a partial value with nested path and array index', () => {
      const initialValues = { name: '', address: { city: '', streets: [''] } }
      const form = createForm({ initialValues })
      form.setValues('address', { city: 'Paris', streets: ['rue de la paix'] })
      expect(form.values).toEqual({
         name: '',
         address: { city: 'Paris', streets: ['rue de la paix'] }
      })
   })
})

describe('createForm - setErrors', () => {
   it('should change all errors', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setErrors({ name: 'Name is required' })
      expect(form.errors).toEqual({ name: 'Name is required' })
   })

   it('should change a single error', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setErrors('name', 'Name is required')
      expect(form.errors).toEqual({ name: 'Name is required' })
   })

   it('should change a single error with nested path', () => {
      const initialValues = { name: '', address: { city: '' } }
      const form = createForm({ initialValues })
      form.setErrors('address.city', 'City is required')
      expect(form.errors).toEqual({
         name: '',
         address: { city: 'City is required' }
      })
   })

   it('should change a single error with nested path and array index', () => {
      const initialValues = { name: '', address: { city: '', streets: [''] } }
      const form = createForm({ initialValues })
      form.setErrors('address.streets.0', 'Street is required')
      expect(form.errors).toEqual({
         name: '',
         address: { city: '', streets: ['Street is required'] }
      })
   })

   it('should change a partial error with nested path', () => {
      const initialValues = { name: '', address: { city: '', street: '' } }
      const form = createForm({ initialValues })
      form.setErrors('address', {
         city: 'City is required',
         street: 'Street is required'
      })
      expect(form.errors).toEqual({
         name: '',
         address: { city: 'City is required', street: 'Street is required' }
      })
   })

   it('should change a partial error with nested path and array index', () => {
      const initialValues = { name: '', address: { city: '', streets: [''] } }
      const form = createForm({ initialValues })
      form.setErrors('address', {
         city: 'City is required',
         streets: ['Street is required']
      })
      expect(form.errors).toEqual({
         name: '',
         address: { city: 'City is required', streets: ['Street is required'] }
      })
   })
})

describe('createForm - setTouched', () => {
   it('should change all touched', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setTouched({ name: true })
      expect(form.touched).toEqual({ name: true })
   })

   it('should change a single touched', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setTouched('name', true)
      expect(form.touched).toEqual({ name: true })
   })

   it('should change a single touched with nested path', () => {
      const initialValues = { name: '', address: { city: '' } }
      const form = createForm({ initialValues })
      form.setTouched('address.city', true)
      expect(form.touched).toEqual({
         name: '',
         address: { city: true }
      })
   })

   it('should change a single touched with nested path and array index', () => {
      const initialValues = { name: '', address: { city: '', streets: [''] } }
      const form = createForm({ initialValues })
      form.setTouched('address.streets.0', true)
      expect(form.touched).toEqual({
         name: '',
         address: { city: '', streets: [true] }
      })
   })
   it('should change a partial touched with nested path', () => {
      const initialValues = { name: '', address: { city: '', street: '' } }
      const form = createForm({ initialValues })
      form.setTouched('address', {
         city: true,
         street: true
      })
      expect(form.touched).toEqual({
         name: '',
         address: { city: true, street: true }
      })
   })
})

describe('createForm - reset functions', () => {
   it('should reset all values by calling resetValues', () => {
      const initialValues = { name: '', address: { city: '', street: '' } }
      const form = createForm({ initialValues })
      form.setValues({
         name: 'John',
         address: { city: 'Paris', street: 'rue de la paix' }
      })
      form.resetValues()
      expect(form.values).toEqual({
         name: '',
         address: { city: '', street: '' }
      })
   })

   it('should reset all errors by calling resetErrors', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setErrors({ name: 'Name is required' })
      form.resetErrors()
      expect(form.errors).toEqual({ name: '' })
   })

   it('should reset all touched by calling resetTouched', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      form.setTouched({ name: true })
      form.resetTouched()
      expect(form.touched).toEqual({ name: false })
   })

   it('should reset all values and errors by calling resetForm', () => {
      const initialValues = { name: '', address: { city: '', street: '' } }
      const form = createForm({ initialValues })
      form.setValues({
         name: 'John',
         address: { city: 'Paris', street: 'rue de la paix' }
      })
      form.setErrors('name', 'Name is required')
      form.resetForm()
      expect(form.values).toEqual({
         name: '',
         address: { city: '', street: '' }
      })
      expect(form.errors).toEqual({
         name: '',
         address: { city: '', street: '' }
      })
   })
})

describe('createForm - handleSubmit', () => {
   it('should call onSubmit function', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      const onSubmit = jest.fn()
      const submitEvent = form.handleSubmit(onSubmit)
      submitEvent({ preventDefault: () => {} })
      expect(onSubmit).toHaveBeenCalled()
   })

   it('should call onSubmit function with values', () => {
      const initialValues = { name: 'John Doe' }
      const form = createForm({ initialValues })
      const onSubmit = jest.fn()
      const submitEvent = form.handleSubmit(onSubmit)
      submitEvent({ preventDefault: () => {} })
      expect(onSubmit).toHaveBeenCalledWith(form.values)
   })
})

describe('createForm - register', () => {
   it('should register a field', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      const field: [string, string] = ['name', 'text']
      const properties = form.register(...field)
      expect(properties).toEqual({
         name: 'name',
         type: 'text',
         value: '',
         onInput: expect.any(Function),
         onBlur: expect.any(Function)
      })
   })
})

describe('createForm - onINput and on Blur events', () => {
   it('should change values by calling onInput', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      const field: [string, string] = ['name', 'text']
      const properties = form.register(...field)
      properties.onInput({ target: { value: 'John Doe', name: 'name' } })
      expect(form.values).toEqual({ name: 'John Doe' })
   })

   it('should change touched by calling onBlur', () => {
      const initialValues = { name: '' }
      const form = createForm({ initialValues })
      const field: [string, string] = ['name', 'text']
      const properties = form.register(...field)
      properties.onBlur({ target: { value: 'John Doe', name: 'name' } })
      expect(form.touched).toEqual({ name: true })
   })
})
