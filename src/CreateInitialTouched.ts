import { clone, replacePrimitivesInObject } from './ObjectUtils'

export function createInitialTouched<T extends {}>(values: T) {
   return replacePrimitivesInObject(clone(values), false)
}
