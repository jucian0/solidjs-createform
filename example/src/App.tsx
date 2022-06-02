import { Component, createSignal } from 'solid-js'
import styles from './App.module.css'
import { createform } from '../../src'

const form = createform({
   initialValues: {
      name: 'Juciano',
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
   }
})

const App: Component = () => {
   const { register, state, setFieldValue, reset, isValid } = form

   const [test, setTest] = createSignal('')

   return (
      <div class={styles.App}>
         <header class={styles.header}>
            <input placeholder="name" {...register('name')} />
            <input placeholder="lastName" {...register('lastName')} />
            <input placeholder="Street" {...register('address.street')} />
            <input type="checkbox" {...register('bool', 'checkbox')} />
            <input placeholder="City" {...register('address.city')} />
            <input placeholder="Range" {...register('distance', 'range')} />
            <input {...register('date', 'date')} />
            <input value={new Date()} />
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
