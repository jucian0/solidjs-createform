/**
 * ProtoForm types are used to define the type of a field in a form.
 * It's not a form itself, but it's used to create a real form.
 */
export type ProtoForm<T extends ProtoForm<T>> = {
   initialValues: T['initialValues']
   validationSchema?: any
}

/**
 * Native types that can be used in a input field.
 */
export type NativeValue = boolean | string | number

/**
 * Errors types are used to define the type of errors in a form.
 * It's created based on the initial values, but we change the input value type to string.
 * So we can display the error message in the input field.
 */
export type Errors<T> = {
   [k in keyof T]: T[k] extends NativeValue
      ? string
      : T[k] extends Array<any>
      ? Errors<T[k][number]>[]
      : Errors<T[k]>
}

/**
 * Touched types are used to define the type of touched in a form.
 * It's created based on the initial values, but we change the input value type to boolean.
 * So we can validate if the input field is touched.
 */
export type Touched<T> = {
   [k in keyof T]: T[k] extends NativeValue
      ? boolean
      : T[k] extends Array<any>
      ? Touched<T[k][number]>[]
      : Touched<T[k]>
}

/**
 * Values types are used to define the type of values in a form.
 * It's created based on the initial values.
 */
export type Values<T extends ProtoForm<T>> = T['initialValues']

type Register = (
   name: string,
   type: string
) => {
   onInput: (e: any) => void
   onBlur: (e: any) => void
   name: string
   type: string
   value: any
}

type SetTouched<T extends ProtoForm<T>> = (
   pathOrValue: FormSetterParam<Touched<Values<T>>>,
   partial?: any
) => void

type SetErrors<T extends ProtoForm<T>> = (
   pathOrValue: FormSetterParam<Errors<Values<T>>>,
   partial?: any
) => void

type SetValues<T extends ProtoForm<T>> = (
   pathOrValue: FormSetterParam<Values<T>>,
   partial?: any
) => void

type FormSetterParam<T> = string | T

type ResetForm = () => void

type ResetValues = () => void

type ResetErrors = () => void

type ResetTouched = () => void

export type Form<T extends ProtoForm<T>> = {
   /**
    * Represents the current values of the form.
    * @type {Values<T>}
    * @memberof Form
    * @example
    * const form = createForm(protoForm)
    * form.values // { name: '', age: 0 }
    **/
   values: Values<T>
   /**
    * Represents the current touched fields of the form.
    * @type {Touched<T>}
    * @memberof Form
    * @example
    * const form = createForm(protoForm)
    * form.touched // { name: false, age: false }
    **/
   touched: Touched<Values<T>>
   /**
    * Represents the current errors of the form.
    * @type {Errors<T>}
    * @memberof Form
    * @example
    * const form = createForm(protoForm)
    * form.errors // { name: '', age: '' }
    * form.setErrors({ name: '', age: '' })
    **/
   errors: Errors<Values<T>>
   /**
    * Registers a field to the form.
    * @param {string} name The name of the field.
    * @param {string} type The type of the field.
    * @returns {Register}
    * @memberof Form
    * @example
    * const form = createForm(protoForm)
    * const register = form.register('name', 'text')
    * <input {...register('name of input', 'type of input')} />
    **/
   register: Register
   /**
    * Set the field or fields to touched.
    * @param pathOrValue - The path to the value or the value itself
    * @param partial -The partial object to set
    * @example
    * setTouched('name', true)
    * setTouched('name.first', true)
    * setTouched('name.last', true)
    **/
   setTouched: SetTouched<T>
   /**
    * Set field or fields message error.
    * @param pathOrValue - The path to the value or the value itself
    * @param partial - The partial object to set
    * @example
    * setErrors('name', 'error message')
    * setErrors('name.first', 'error message')
    * setErrors('name.last', 'error message')
    **/
   setErrors: SetErrors<T>
   /**
    * Set the values of the form to the given values.
    * @param pathOrValue - The path to the value or the value itself
    * @param partial - The partial object to set
    * @example
    * setValues('name', 'value')
    * setValues('name.first', 'value')
    * setValues('name.last', 'value')
    */
   setValues: SetValues<T>
   /**
    * Handle submit event.
    * @param callbackFn - callback function to call when submit is clicked
    */
   handleSubmit: (callbackFn: (values: Values<T>) => void) => (e: any) => void
   /**
    * Reset the form.
    * It will reset the values, errors and touched.
    * @example
    * resetForm()
    */
   resetForm: ResetForm
   /**
    * Reset the values of the form.
    * @example
    * resetValues()
    */
   resetValues: ResetValues
   /**
    * Reset the errors of the form.
    * It will reset the errors of the form, the initial errors is created based on the initial values,
    * after a validation process based on the validation schema.
    * @example
    * resetErrors()
    */
   resetErrors: ResetErrors
   /**
    * Reset the touched of the form.
    * @example
    * resetTouched()
    */
   resetTouched: ResetTouched
}
