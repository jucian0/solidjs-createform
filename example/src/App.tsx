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
         number: 0
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

   createEffect(() => {
      console.log(form.values.name, 'values')
   })

   createEffect(() => {
      console.log(form.touched.address.street, 'touched')
   })

   createEffect(() => {
      console.log(form.errors, 'errors')
   })

   return (
      <div class={styles.App}>
         <h1>Solid-JS</h1>
         <form>
            <input {...register('name', 'text')} placeholder="Name" />
            <input {...register('email', 'text')} placeholder="E-mail" />
            <input
               {...register('address.street', 'text')}
               placeholder="Street"
            />

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

            <button
               type="button"
               onClick={() =>
                  form.setValues({
                     name: 'Andre',
                     email: 'andre@andre.com',
                     address: { street: 'Virginio', number: 23 }
                  })
               }
            >
               set All
            </button>
         </form>
      </div>
   )
}

export default App
