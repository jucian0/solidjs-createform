import { Component, createEffect, createSignal } from 'solid-js'
import styles from './App.module.css'
import { formGroup, createForm } from '../../src'
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

const protoForm = formGroup({
   name: ['juciano'],
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

const form = createForm({
   name: ['juciano'],
   age: [30, yup.number().required()],
   email: ['juciano@juciano.com', yup.string().email()],
   password: ['123456', yup.string().required()],
   address: {
      street: ['verginio belgine', yup.string().required()],
      city: ['itatiba', yup.string().required()],
      another: {
         myAnother: ['another value', yup.string().required()]
      }
   }
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
         <form></form>
      </div>
   )
}

export default App
