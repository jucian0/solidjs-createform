import { Component, createEffect, createSignal } from 'solid-js'
import styles from './App.module.css'
import { createForm } from '../../src'
import * as yup from 'yup'

const form = createForm({
   initialValues: {
      name: '',
      lastName: '',
      address: {
         street: '',
         city: '',
         state: '',
         zip: ''
      },
      bool: true,
      distance: 23,
      date: new Date().toLocaleDateString()
   },
   validationSchema: yup.object().shape({
      name: yup
         .string()
         .required('Name is required')
         .min(3, 'Name must be at least 3 characters'),
      lastName: yup
         .string()
         .required('Last name is required')
         .max(10, 'Last name must be at most 10 characters')
   })
})

const App: Component = () => {
   const { register, state, setFieldValue, reset } = form

   const [test, setTest] = createSignal('')

   return (
      <div class={styles.App}>
         <header class={styles.header}>
            <input placeholder="name" {...register('name')} />
            {state.touched.name && <span>{state.errors.name}</span>}
            <input placeholder="lastName" {...register('lastName')} />
            {state.touched.lastName && <span>{state.errors.lastName}</span>}
            <input placeholder="Street" {...register('address.street')} />
            <input {...register('bool', 'checkbox')} />
            <input placeholder="City" {...register('address.city')} />
            <input placeholder="Range" {...register('distance', 'range')} />
            <input {...register('date', 'date')} />
            <button
               onClick={() => setFieldValue('address.street', 'novo valor')}
            >
               Set Value
            </button>
            <button onClick={() => reset()}>Reset</button>
         </header>
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
