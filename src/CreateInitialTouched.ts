import { replacePrimitivesInObject } from './ObjectUtils'

export function createInitialTouched<T extends {}>(values: T) {
   return replacePrimitivesInObject(values, false)
}
