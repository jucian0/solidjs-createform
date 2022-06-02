import { createStore, } from "solid-js/store";
import { CreateFormArgs } from "./Types";
import * as Dot from './ObjectUtils';

const defaultValues = {
   initialValues: {},
   initialErrors: {},
   initialTouched: {}
}

/**
 * createForm function create a form Store and return a hook that can be used to manage the form state.
 * @param args CreateFormArgs type that contains the initial values of form, initial errors of form, initial touched of form,
 * @returns {function(*): *} a function that returns a hook that can be used to manage the form state.
 **/
export function createForm<T extends CreateFormArgs<T['initialValues']>>(args:T){

   const initialState = {...defaultValues, ...args}
   const restore = Dot.clone(initialState)

   /**
    * This is the store of the form,
    * it is an object that contains the values of form,
    * errors of form,
    * touched of form.
    **/
    const [state, setState] = createStore({
      values: initialState.initialValues,
      errors: initialState.initialErrors,
      touched: initialState.initialTouched,
      isValid: Dot.isEmpty(initialState.initialErrors),
   })
   
   /**
    * This is the hook that can be used to manage the form state.
    **/ 
   return function useForm(){

      const {values,errors,touched,isValid} = state

      function register(name:string){

         return {
            onInput: (e:any) => {
               const value = e.target.value
               setState(`values`, Dot.set(values, name, value))
            },
            onBlur: () => {
               setState(`touched`, Dot.set(touched, name, true))
            },
            value: Dot.get(values, name),
         }
      }

      function reset(){
         setState(`values`, restore.initialValues)
      }

      function resetFieldValue(name:string){
         setState(`values`, Dot.set(values, name, Dot.get(restore.initialValues, name)))
      }

      function setFieldValue(name:string, value:any){
         setState(`values`, Dot.set(values, name, value))
      }

      function resetFieldError(name:string){
         setState(`errors`, Dot.set(errors, name, undefined))
      }

      function setFieldError(name:string, error:any){
         setState(`errors`, Dot.set(errors, name, error))
      }

      function resetFieldTouched(name:string){
         setState(`touched`, Dot.set(touched, name, false))
      }

      function setFieldTouched(name:string){
         setState(`touched`, Dot.set(touched, name, true))
      }

      return {
         register,
         state,
         reset,
         subscribe: setState,
         setFieldValue,
         resetFieldValue,
         setFieldError,
         resetFieldError,
         setFieldTouched,
         resetFieldTouched,
         isValid,
      }
   }
}