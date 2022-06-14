// import { createForm } from './CreateForm'
// import { FormGroup, State, FormGroup, FieldProps } from './Types'
// import { syncValidate } from './Validate'

// export function evaluateForm<T>(
//   form: FormGroup<T> | typeof createForm,
//   initial = {}
// ) {
//   for (const key in form) {
//     if (form[key] instanceof Array) {
//       initial[key] = evaluateInput(form[key])
//       console.log('AA', key)
//     } else if (!form[key].hasOwnProperty('value')) {
//       //initial[key] = evaluateForm(form[key], initial)
//       console.log('BB', key)
//       //initial[key] = evaluateInput(form[key])

//       console.log('BB', key, form[key])
//     }
//   }
//   return initial
// }

// function evaluateInput(input: FormGroup<any>): FieldProps<any> {
//   const baseProps = {
//     touched: false,
//     pristine: true,
//     value: input[0]
//   }

//   if (input instanceof Array) {
//     if (input.length === 1) {
//       return {
//         ...baseProps
//       }
//     }

//     return {
//       ...baseProps,
//       error: syncValidate(input[0], input[1]),
//       schema: input[1]
//     }
//   }

//   return {
//     ...baseProps,
//     value: input
//   }
// }
