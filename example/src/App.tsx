import { Component, createEffect, createSignal } from 'solid-js'
import styles from './App.module.css'
import { createForm } from '../../src'
import * as yup from 'yup'

const form = createForm({
   name: [''],
   age: ['', yup.number().required()],
   email: ['', yup.string().email()],
   password: ['', yup.string().required()],
   address: createForm({
      street: ['', yup.string().required()],
      city: ['', yup.string().required()]
   })
})

const App: Component = () => {
   //const { register, state, setFieldValue, reset } = form

   createEffect(() => {
      console.log(form.form.name.value)
      console.log(form.form.name.error)
   })
   return (
      <div class={styles.App}>
         <h1>Solid-JS</h1>
         <form>
            <div>
               <label>Name</label>
               <input {...form.register('name', 'text')} />
               <button type="button" onClick={form.reset}>
                  Reset
               </button>
            </div>
         </form>
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
