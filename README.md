![Logo](img/logo3.png)

<h1 align="center">Welcome to createform 👋</h1>

> A SolidJS package to create forms easily and quickly.

### 🏠 [Homepage](https://createform.org)

### ✨ [Demo](https://codesandbox.io/s/createform-2u2ju)
# createform





## Motivation

Today we have a lot of form packages, and this project don't pretend to be the number one, this is just a new way to create hooks to manage your forms. But if you guys like this project, we can publish it, and maintain it.

## First step
The first step is to create your form with the `createform` function, this function returns a hook that you can use to manage your form, wherever you want to use.

``` javascript

export const useLoginForm = createform({
  initialValues: {
    email: 'juciano@juciano.com',
    password: 'yourpassword',
  }
})
```

## Second step
The second step is to create a component to render your form, you can use the `useLoginForm` hook to get the form state and manage it.

```jsx
   import { useLoginForm } from 'react-create-form'
   
   const LoginForm = () => {
      const { handleSubmit, register } = useLoginForm()

      function onSubmit(values) {
        console.log(values)
      }
   
      return (
         <form onSubmit={handleSubmit(onSubmit)}>
         <input type="email" ref={register('email')} />
         <input type="password" ref={register('password')}/>
         <button type="submit">Submit</button>
         </form>
      )
   }
```


# It's All.

## Read the full documentation [here](https://createform.org/docs/).
### [Post](https://dev.to/jucian0/building-forms-with-createform-1cna)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/use-form/use-form/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/use-form/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

[![Stargazers repo roster for @use-form/use-form](https://reporoster.com/stars/use-form/use-form)](https://github.com/use-form/use-form/stargazers)

## 📝 License

Copyright © 2021 [createform](https://github.com/use-form).<br />
This project is [MIT](https://github.com/use-form/use-form/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
