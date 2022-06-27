type Control<T> = [T, any?]

type FormControlReturn<T extends Control<T>> = {
   value: T[0]
   error?: string
   touched: boolean
   pristine: boolean
   schema?: any
}

type FormGroupReturn<T> = {
   [k in keyof T]: T[k] extends Control<any>
      ? FormControlReturn<T[k]>
      : FormGroupReturn<T[k]>
}

export type Group<T> = {
   [k in keyof T]: T[k] extends Control<any> ? Control<T[k][0]> : Group<T[k]>
}

export type FormControl = <T extends Control<T>>(
   params: T
) => FormControlReturn<T>

export type FormGroup = <T extends Group<T>>(group: T) => FormGroupReturn<T>
