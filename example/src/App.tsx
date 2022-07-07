import { Component } from 'solid-js'
import styles from './App.module.css'
import * as yup from 'yup'
import { createForm } from './../../src'
const form = createForm({
   initialValues: {
      name: 'juciano barbosa',
      email: 'juciano@juciano.com'
   }
})

const App: Component = () => {
   const { register } = form
   console.log(form)
   return (
      <div class={styles.App}>
         <h1>Solid-JS</h1>
         <form>
            <input {...register('name', 'text')} />
            <input {...register('email', 'text')} />
         </form>
      </div>
   )
}

export default App
