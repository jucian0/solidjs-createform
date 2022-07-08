export function createInitialErrors<T extends {}>(values: T) {
   for (let key in values) {
      if (typeof values[key] === 'object') {
         values[key] = createInitialErrors(values[key])
      } else if (Array.isArray(values[key])) {
      }
      values[key] = ''
   }

   return values
}
