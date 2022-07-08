import { Component, createEffect } from 'solid-js'
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

   createEffect(() => {
      console.log(form.values.name)
   })

   createEffect(() => {
      console.log(form.touched.name)
   })

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
