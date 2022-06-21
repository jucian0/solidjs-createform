import { Component, createEffect, createSignal } from 'solid-js'
import styles from './App.module.css'
import { formGroup } from '../../src'
import * as yup from 'yup'
import { State } from '../../src/Types'

type UserForm = {
   name: string
   email: string
   password: string
   age: number
   address: {
      street: string
      city: string
      another: {
         myAnother: string
      }
   }
}

const form = formGroup({
   name: ['juciano', yup.string().required()],
   age: [30, yup.number().required()],
   email: ['juciano@juciano.com', yup.string().email()],
   password: ['123456', yup.string().required()],
   address: formGroup({
      street: ['verginio belgine', yup.string().required()],
      city: ['itatiba', yup.string().required()],
      another: formGroup({
         myAnother: ['another value', yup.string().required()]
      })
   })
})

const App: Component = () => {
   //const { register, state, setFieldValue, reset } = form
   // createEffect(() => {
   //    console.log(form.form.name.value)
   //    console.log(form.form.name.error)
   // })

   console.log(form)
   return (
      <div class={styles.App}>
         <h1>Solid-JS</h1>
         {/* <form onSubmit={form.handleSubmit(e => console.log(e))}>
        <div>
          <label>Name</label>
          <input {...form.register('name', 'text')} />
        </div>
        <div>
          <label>Age</label>
          <input {...form.register('age', 'text')} />
        </div>
        <div>
          <label>Email</label>
          <input {...form.register('email', 'text')} />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={form.reset}>
          Reset
        </button>
      </form> */}
      </div>
   )
}

export default App

// import { createEffect } from 'solid-js'
// import { createStore } from 'solid-js/store'

// export default function App() {
//   const [form, set] = createStore({
//     form: {
//       values: {
//         name: '',
//         password: ''
//       },
//       touched: {
//         name: '',
//         password: ''
//       },
//       errors: {
//         name: 'Invalid name',
//         password: 'Unsafe password'
//       }
//     },
//     setValue: (field: string, next: string) => {
//       set('form', 'values', { ...form.form.values, [field]: next })
//     },
//     setTouched: (field: string, next: boolean) => {
//       set('form', 'touched', { ...form.form.values, [field]: next })
//     },
//     setError: (field: string, next: string) => {
//       set('form', 'errors', { ...form.form.values, [field]: next })
//     }
//   })
//   function handleSubmit(e: FormDataEvent) {
//     e.preventDefault()
//     console.log(form.form.values)
//   }

//   createEffect(() => {
//     console.log(form.form.values)
//   })

//   return (
//     <form class="row g-3" onSubmit={handleSubmit}>
//       <div class="col-auto">
//         <label for="staticEmail2" class="visually-hidden">
//           Name
//         </label>
//         <input
//           type="text"
//           class="form-control"
//           value={form.form.values.name}
//           onInput={e => form.setValue('name', e.currentTarget.value)}
//         />
//       </div>
//       <div class="col-auto">
//         <label for="inputPassword2" class="visually-hidden">
//           Password
//         </label>
//         <input
//           type="password"
//           class="form-control"
//           placeholder="Password"
//           value={form.form.values.password}
//           onInput={e => form.setValue('password', e.currentTarget.value)}
//         />
//       </div>
//       <div class="col-auto">
//         <button type="submit" class="btn btn-primary mb-3">
//           Confirm identity
//         </button>
//       </div>
//     </form>
//   )
// }
