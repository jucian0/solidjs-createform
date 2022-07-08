export function createInitialTouched<T extends {}>(values: T) {
   function evaluate(partial: any) {
      for (const key in partial) {
         if (typeof partial[key] === 'object') {
            partial[key] = evaluate(partial[key])
            console.log(partial[key])
         }
         partial[key] = false
      }
      return partial
   }
   return evaluate(values)
}
