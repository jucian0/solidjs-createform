export function createInitialTouched<T extends {}>(values: T) {
   for (let key in values) {
      if (typeof values[key] === 'object') {
         values[key] = createInitialTouched(values[key])
      }
      values[key] = false
   }

   return values
}
