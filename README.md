# Welcome to createform 👋

> A SolidJS package to create forms easily and quickly.

# createform

Createform is an open-source package to create forms for SolidJS applications. It's based on [useForm](https://github.com/Jucian0/useform)

## Motivation

I decided to create a package that could simplify the creation of forms, and, make it easier to use. After a quick research, I found that there are not many packages to create forms for SolidJs, so I decided to create one, that could be used by anyone.

The main idea is to create a form easily and quickly, without many lines of code, fortunately, SolidJs provides us a powerful and easy way to do that.

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

`createForm` receives an object with the following properties:

- `initialValues`: An object with the initial values of the form.
- `validationSchema`: A validation schema to validate the form. By default, `createForm` uses yup validation schema.

`createForm` returns an object with the following properties:

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

- `setTouched`: Set the touched state of the form.

  ```jsx
  const form = createForm...
  const { register, handleSubmit, errors, setTouched } = form

  <form>
    <input {...register('name', 'text')} />
    <button onClick={() => setTouched('name')}>Touch</button>
  </form>
  ```

- `setValues`: Set the values of the form.

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

## Let us know what you think

Feel free to [open an issue](https://github.com/Jucian0/solidjs-createform/issues) if you have any feedback, or if you want to contribute.

## Show your support

Give us a star on [GitHub](https://github.com/Jucian0/solidjs-createform) if you like this project.
