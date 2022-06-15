import { ArraySchema, NumberSchema, Schema, StringSchema } from 'yup'

type FieldRegisterProps = {
   onInput: (this: GlobalEventHandlers, ev: Event) => any
   onBlur: (this: GlobalEventHandlers, ev: FocusEvent) => any
   [key: string]: any
}

export type InputType =
   | 'text'
   | 'checkbox'
   | 'radio'
   | 'number'
   | 'email'
   | 'password'
   | 'tel'
   | 'url'
   | 'search'
   | 'date'
   | 'time'
   | 'datetime-local'
   | 'month'
   | 'week'
   | 'color'
   | 'range'
   | 'file'

export type FormControl<T> = T extends [infer U, infer V] ? [U, V] : T

export type FormGroup<T> = {
   [k in keyof T]: T[k] extends {} ? FormGroup<T[k]> : FormControl<T[k]>
}

export type FieldProps<T> = {
   value: T
   error?: string
   touched: boolean
   pristine: boolean
   schema?: StringSchema<string> | NumberSchema<number> | ArraySchema<any>
}

/**
 * Should add recursive type support
 */
export type State<T> = {
   [k in keyof T]: FieldProps<T[k] extends [] ? T[k][0] : string>
}

/**
 *
 */
export type Form<T> = {
   /**
    * `register` is a function that returns a object that contains the input properties.
    * @param name the name of the field.
    * @returns {object} an object that contains the input properties.
    * @example <input {...register('name')} />
    **/
   register: (
      name: string,
      type?: 'text' | 'radio' | 'select' | 'checkbox' | 'range' | 'date'
   ) => FieldRegisterProps
   /**
    * `state` is an object that contains the values of form, errors of form, touched of form.
    **/
   state: State<T>
   /**
    * `reset` is a function that resets the form.
    **/
   reset: () => void
   /**
    * `resetFieldValue` is a function that resets the value of a field.
    * @param name the name of the field.
    **/
   resetValue: (name: string) => void
   /**
    * `setFieldValue` is a function that sets the value of a field.
    * @param name the name of the field.
    * @param value the value of the field.
    **/
   setValue: (name: string, value: any) => void
   /**
    * `resetFieldError` is a function that resets the error of a field.
    * @param name the name of the field.
    **/
   resetError: (name: string) => void
   /**
    * `setFieldError` is a function that sets the error of a field.
    * @param name the name of the field.
    * @param error the error of the field.
    **/
   setError: (name: string, error: any) => void
   /**
    * `resetFieldTouched` is a function that resets the touched of a field.
    * @param name the name of the field.
    **/
   resetTouched: (name: string) => void
   /**
    * `setFieldTouched` is a function that sets the touched of a field.
    * @param name the name of the field.
    **/
   setTouched: (name: string, touched: boolean) => void
   //   /**
   //    * `isValid` is a boolean that indicates if the form is valid.
   //    **/
   //   isValid: boolean
   /**
    * `handleSubmit` is a function that handles the submit of the form.
    * @param onSubmit the function that is called when the form is submitted.
    **/
   handleSubmit: (onSubmit: (values: T) => void) => (event: Event) => void
}
