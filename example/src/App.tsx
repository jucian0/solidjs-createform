import { Component, createEffect } from 'solid-js'
import styles from './App.module.css'
import * as yup from 'yup'
import { createForm } from './../../src'
const form = createForm({
   initialValues: {
      name: '',
      email: '',
      address: {
         street: '',
         number: null
      }
   },
   validationSchema: yup.object({
      name: yup.string().min(6),
      email: yup.string().email().required(),
      address: yup.object({
         street: yup.string().required()
      })
   })
})

const App: Component = () => {
   const { register } = form

   //   createEffect(() => {
   //     //console.log(form.values.name)
   //   })

   //   createEffect(() => {
   //     console.log(form.touched.address.street)
   //   })

   //   createEffect(() => {
   //     console.log(form.errors)
   //   })

   return (
      <div class={styles.App}>
         <h1>Solid-JS</h1>
         <form>
            <input {...register('name', 'text')} />
            <input {...register('email', 'text')} />
            <input {...register('address.street', 'text')} />

            <button
               type="button"
               onClick={() => form.setValues('name', 'Antonio Barbosa')}
            >
               set Name
            </button>

            <button
               type="button"
               onClick={() =>
                  form.setValues('address', 'street', 'Verginio Belgine')
               }
            >
               set Street
            </button>
         </form>
      </div>
   )
}

export default App
