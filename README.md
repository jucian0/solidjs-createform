![Logo](img/logo3.png)

<h1 align="center">Welcome to createform 👋</h1>

> A SolidJS package to create forms easily and quickly.

# createform

Createform is an open-source package to create forms for SolidJS applications. It's based on [useForm](https://useform.org)

## Motivation

Since SolidJS is a new framework, there is no existing great package to create forms. I decided to create this package to simplify the process of creating forms. Createform supports the following features:

- Creates form with fields
- Creates form with validation
- Supports custom fields
- Update touched state of form fields independently or all together
- Update values state of form fields independently or all together
- Update errors state of form fields independently or all together

## How to use it

To use `createform` you need to import it into your SolidJS application.

```js
import { createForm } from 'createform'
```

Then you can create a form.

```js
const form = createForm({
  initialValues: {
    name: '',
    email: '',
    password: ''
  }
})
```

Now you can use it everywhere in your SolidJS application.

```js
function App() {
  const { register, handleSubmit, errors } = form

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', 'text')} />
        <input {...register('email', 'email')} />
        <input {...register('password', 'password')} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

## Validation

CreateForm uses yup validation schema, so you just need to pass a validation schema to the `createForm` function.

```js
const form = createForm({
  initialValues: {
    name: '',
    email: '',
    password: ''
  },
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  })
})
```
