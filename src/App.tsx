import { Component, createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import { createForm } from './use-form/CreateForm';
import { setFieldValue } from './use-form/FieldsUtils';

const useUserForm = createForm({
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
  const { register, state, subscribe, setFieldValue, reset, } = useUserForm()

  const [test, setTest] = createSignal('')

  // createEffect(() => {
  //   console.log(state.values.name)
  // })


  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input placeholder='name' type="text" {...register('name')} />
        <input placeholder='lastName' type="text" {...register('lastName')} />
        <input placeholder='Street' type="text" {...register('address.street')} />
        <button onClick={() => setFieldValue('address.street', 'novo valor')}>Set Value</button>
        <button onClick={() => reset()}>Reset</button>
      </header>
    </div>
  );
};

export default App;
