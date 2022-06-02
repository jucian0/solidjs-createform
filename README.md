![Logo](img/logo3.png)

<h1 align="center">Welcome to createform 👋</h1>

> A SolidJS package to create forms easily and quickly.

# createform

Createform is an open-source package to create forms for SolidJS applications. It's based on [useForm](https://useform.org)



## Motivation

Since SolidJS is a new framework, there is no existing great package to create forms. I decided to create this package to simplify the process of creating forms. 


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
    password: '',
  },
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
        <input type="text" {...register('name')} />
        <input type="email" {...register('email')} />
        <input type="password" {...register('password')} />
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
    password: '',
  },
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  }),
})
```
# It's All.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/use-form/use-form/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/use-form/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

[![Stargazers repo roster for @use-form/use-form](https://reporoster.com/stars/use-form/use-form)](https://github.com/jucian0/useform/stargazers)

## 📝 License

Copyright © 2021 [createform](https://github.com/jucian0).<br />
This project is [MIT](https://github.com/use-form/use-form/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
