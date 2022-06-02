type Input = {
   onInput: ((this: GlobalEventHandlers, ev: Event) => any) ;
   onBlur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) ;
   value: string,
}

//Pick<HTMLInputElement, 'oninput' & 'onblur' & 'value'>

/**
 * state is one of properties that is returned by useForm hook, this object contains the current state of form when the form is controlled or debounced.
 */
export type State<T> = {
   values: T
   errors: Errors<T>
   touched: Touched<T>
   isValid: boolean
}

/**
 * Touched type represents a touched object that has all properties of a form values, when this properties is primitive type ww convert this in a boolean,
 *  otherwise if this an object we start again validating every properties.
 */
export type Touched<Values> = {
   [k in keyof Values]?: Values[k] extends number | string | boolean | Date
      ? boolean
      : Values[k] extends Array<any>
      ? Touched<Values[k][number]>[]
      : Touched<Values[k]>
}

/**
 * Errors type represents a errors object that has all properties of a form values, when this properties is primitive type ww convert this in a string,
 *  otherwise if this an object we start again validating every properties.
 */
export type Errors<Values> = {
   [k in keyof Values]?: Values[k] extends number | string | boolean | Date
      ? string
      : Values[k] extends Array<any>
      ? Errors<Values[k][number]>[]
      : Errors<Values[k]>
}

/**
 * useForm hook needs an object that describe and provide some properties like initial values of form, initial errors of form, initial touched of form,
 * and needs know what kind of form, is Controlled, debounced is about that.
 */
export type CreateFormArgs<T> = {
   /** represents a initial value of form */
   readonly initialValues?: T
   /** represents a initial values of inputs errors */
   readonly initialErrors?: Errors<T>
   /** represents a initial values of visited inputs */
   readonly initialTouched?: Touched<T>
   /** validation schema provided by yup */
   readonly validationSchema?: any //YupSchema<T>
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
   register: (name: string) => Input,
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
}