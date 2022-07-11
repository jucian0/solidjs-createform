import { clone, replacePrimitivesInObject } from './ObjectUtils'

export function createInitialErrors<T extends {}>(values: T) {
   return replacePrimitivesInObject(clone(values), '')
}
