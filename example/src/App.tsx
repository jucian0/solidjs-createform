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
      //console.log(form.values.name, 'values')
   })

   createEffect(() => {
      // console.log(form.touched.address.street, 'touched')
   })

   createEffect(() => {
      //console.log(form.errors, 'errors')
   })

   return (
      <div class={styles.App}>
         <h1>Solid-JS</h1>
         <form>
            <div>
               <input {...register('name', 'text')} placeholder="Name" />
               <span>{form.errors.name}</span>
            </div>
            <div>
               <input {...register('email', 'text')} placeholder="E-mail" />
               <span>{form.errors.email}</span>
            </div>
            <div>
               <input
                  {...register('address.street', 'text')}
                  placeholder="Street"
               />
               <span>{form.errors.address.street}</span>
            </div>

            <button
               type="button"
               onClick={() => form.setValues('name', 'Antonio Barbosa')}
            >
               set Name
            </button>

            <button
               type="button"
               onClick={() =>
                  form.setValues('address.street', 'Verginio Belgine')
               }
            >
               set Street
            </button>

            <button
               type="button"
               onClick={() =>
                  form.setValues('address', { street: 'Virginio', number: 23 })
               }
            >
               set All
            </button>

            <button
               type="button"
               onClick={form.handleSubmit(values => console.log(values))}
            >
               Submit
            </button>
         </form>
      </div>
   )
}

export default App
