import { Component, createSignal } from 'solid-js';
import styles from './App.module.css';
import { createForm } from './use-form/CreateForm';

const form = createForm({
  initialValues: {
    name: 'Juciano',
    lastName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  }
})


const App: Component = () => {
  const { register, state, setFieldValue, reset, isValid } = form

  const [test, setTest] = createSignal('')

  // createEffect(() => {
  //   console.log(state.values.name)
  // })


  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input placeholder='name' onInput={e => console.log(e)} type="text" />
        <input placeholder='lastName' type="text" {...register('lastName')} />
        <input placeholder='Street' type="text" {...register('address.street')} />
        <button onClick={() => setFieldValue('address.street', 'novo valor')}>Set Value</button>
        <button onClick={() => reset()}>Reset</button>
      </header>
    </div>
  );
};

export default App;
