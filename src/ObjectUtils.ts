import { Part } from 'solid-js/store'

function propToPath(prop: any) {
   return prop.replace(/["|']|\]/g, '').split(/\.|\[/)
}

export function nameToPath<T>(name: string) {
   const path = name.split('.') as [Part<T>]

   return path
}

export function get<T extends {}>(defaultObject: T, prop: string) {
   const paths: Array<string> = propToPath(prop)

   function getPropertyValue(
      object: { [k: string]: any } = {},
      index: number
   ): any {
      const clone: any = Object.assign({}, object)
      if (paths.length === index + 1) {
         if (Array.isArray(clone[paths[index]])) {
            return clone[paths[index]].slice()
         } else if (typeof clone[paths[index]] === 'object') {
            if (clone[paths[index]] === null) {
               return null
            }
            return Object.assign({}, clone[paths[index]])
         }
         return clone[paths[index]]
      }
      return getPropertyValue(object[paths[index]], index + 1)
   }

   return getPropertyValue(defaultObject, 0)
}

export function isEmpty<T extends {}>(obj: T) {
   for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
         return false
      }
   }
   return true
}

export function replacePrimitivesInObject<T extends {}>(
   values: T,
   nextValue: any
) {
   function evaluate<T>(partial: T) {
      for (const key in partial) {
         if (typeof partial[key] === 'object' && partial[key]) {
            partial[key] = evaluate(partial[key])
         } else {
            partial[key] = nextValue
         }
      }
      return partial
   }
   return evaluate(values)
}
