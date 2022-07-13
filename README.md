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
import { createForm } from 'solid-js-createform'
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

## API

createForm has the following API:

- `register`: Register a field to the form.

  ```js
  const form = createForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const { register, handleSubmit, errors } = form

  <input {...register('name', 'text')} />
  ```

- `handleSubmit`: Handle form submit.

  ```jsx
  const form = createForm...

  const { register, handleSubmit, errors } = form

  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('name', 'text')} />
    <input {...register('email', 'email')} />
    <input {...register('password', 'password')} />
    <button type="submit">Submit</button>
  </form>
  ```

- `errors`: Get errors of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors } = form

  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('name', 'text')} />
    <span> {errors.name}</span>
  </form>
  ```

- `touched`: Get touched state of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, touched } = form

  <form>
    <input {...register('name', 'text')} />
    <span> {touched.name ? errors.name : ''}</span>
  </form>
  ```

- `values`: Get values of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, values } = form

  createEffect(() => {
    console.log(values.name)
  })

  <form>
    <input {...register('name', 'text')} />
  </form>
  ```

- `setTouched`: Set touched state of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, setTouched } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => setTouched('name')}>Touch</button>
  </form>
  ```

- `setValues`: Set values of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, setValues } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => setValues({ name: 'John' })}>Set values</button>
  </form>
  ```

  or

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, setValues } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => setValues('name','John')}>Set values</button>
  </form>
  ```

- `setErrors`: Set errors of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, setErrors } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => setErrors('name', 'Name is required')}>Set errors</button>
  </form>
  ```

  or

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, setErrors } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => setErrors({name:'Name is required'})}>Set errors</button>
  </form>
  ```

- `resetForm`: Reset the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, resetForm } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => resetForm()}>Reset form</button>
  </form>
  ```

- `resetValues`: Reset values of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, resetValues } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => resetValues()}>Reset values</button>
  </form>
  ```

- `resetErrors`: Reset errors of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, resetErrors } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => resetErrors()}>Reset errors</button>
  </form>
  ```

- `resetTouched`: Reset touched state of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, resetTouched } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => resetTouched()}>Reset touched</button>
  </form>
  ```
