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
         .min(3, 'Name must be at least 3 characters')
   })
})

const App: Component = () => {
   const { register, state, setFieldValue, reset } = form

   const [test, setTest] = createSignal('')

   createEffect(() => {
      console.log(state.values.name, '<<<<<<<<<')
   })

   return (
      <div class={styles.App}>
         <header class={styles.header}>
            <input placeholder="name" {...register('name')} />
            {state.touched.name && <span>{state.errors.name}</span>}
            <input placeholder="lastName" {...register('lastName')} />
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
