import { Part } from 'solid-js/store'

export function nameToPath<T>(name: string) {
   const path = name.split('.') as [Part<T>]

   return path
}
