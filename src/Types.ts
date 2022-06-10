import { Schema } from 'yup'

type InputProps = {
   onInput: (this: GlobalEventHandlers, ev: Event) => any
   onBlur: (this: GlobalEventHandlers, ev: FocusEvent) => any
   [key: string]: any
}

export type KeyOf<T> = number extends keyof T
   ? 0 extends 1 & T
      ? keyof T
      : [T] extends [readonly unknown[]]
      ? number
      : [T] extends [never]
      ? never
      : keyof T
   : keyof T

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

export type InputField<T> =
   | [string | number, Schema<T>]
   | [string | number]
   | string
   | number

export type InputForm<T> = {
   [key in keyof T]: InputField<T[key]> | InputForm<T[key]>
}

export type State<T extends {}> = {
   [k in keyof T]: {
      value: any
      error: string
      touched: boolean
      pristine: boolean
      schema?: Schema<string>
   }
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
   ) => InputProps
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
   resetFieldValue: (name: string) => void
   /**
    * `setFieldValue` is a function that sets the value of a field.
    * @param name the name of the field.
    * @param value the value of the field.
    **/
   setFieldValue: (name: string, value: any) => void
   /**
    * `resetFieldError` is a function that resets the error of a field.
    * @param name the name of the field.
    **/
   resetFieldError: (name: string) => void
   /**
    * `setFieldError` is a function that sets the error of a field.
    * @param name the name of the field.
    * @param error the error of the field.
    **/
   setFieldError: (name: string, error: any) => void
   /**
    * `resetFieldTouched` is a function that resets the touched of a field.
    * @param name the name of the field.
    **/
   resetFieldTouched: (name: string) => void
   /**
    * `setFieldTouched` is a function that sets the touched of a field.
    * @param name the name of the field.
    **/
   setFieldTouched: (name: string, touched: boolean) => void
   /**
    * `isValid` is a boolean that indicates if the form is valid.
    **/
   isValid: boolean
   /**
    * `handleSubmit` is a function that handles the submit of the form.
    * @param onSubmit the function that is called when the form is submitted.
    **/
   handleSubmit: (onSubmit: (values: T) => void) => (event: Event) => void
}
