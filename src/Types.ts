export type ProtoForm<T extends ProtoForm<T>> = {
   initialValues: T['initialValues']
   validationSchema?: any
}

export type NativeValue = boolean | string | number

export type Errors<T> = {
   [k in keyof T]: T[k] extends NativeValue
      ? string
      : T[k] extends Array<any>
      ? Errors<T[k][number]>[]
      : Errors<T[k]>
}

export type Touched<T> = {
   [k in keyof T]: T[k] extends NativeValue
      ? boolean
      : T[k] extends Array<any>
      ? Touched<T[k][number]>[]
      : Touched<T[k]>
}

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
   pathOrValue: string | Touched<Values<T>>,
   partial?: any
) => void

type SetErrors<T extends ProtoForm<T>> = (
   pathOrValue: string | Errors<Values<T>>,
   partial?: any
) => void

type SetValues<T extends ProtoForm<T>> = (
   pathOrValue: string | Values<T>,
   partial?: any
) => void

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
