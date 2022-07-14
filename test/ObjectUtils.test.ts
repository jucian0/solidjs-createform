import * as Dot from './../src/ObjectUtils'

describe('Dot set', () => {
   it('Should set a value', () => {
      const obj = (value: string) => ({ foo: value })
      const newValue = 'baz'
      const newObj = Dot.set(obj('bar'), 'foo', newValue)
      expect(newObj).toEqual(obj(newValue))
   })

   it('Should set a value in an array', () => {
      const obj = (value: string) => ({ foo: [value] })
      const newValue = 'bar'
      const newObj = Dot.set(obj('bar'), 'foo[0]', newValue)
      expect(newObj).toEqual(obj(newValue))
   })

   it('Should set a value in an array with a number', () => {
      const newValue = 'baz'
      const newObj = Dot.set({ foo: [] }, 'foo.1', newValue)
      expect(newObj).toEqual({ foo: [undefined, newValue] })
   })

   it('Should set a value in a nested object', () => {
      const newValue = 'baz'
      const newObj = Dot.set({ foo: { bar: 'bar' } }, 'foo.bar', newValue)
      expect(newObj).toEqual({ foo: { bar: newValue } })
   })
})

describe('Dot get', () => {
   it('Should get a value', () => {
      const obj = { foo: 'bar' }
      expect(Dot.get(obj, 'foo')).toEqual('bar')
   })

   it('Should get a value in an array', () => {
      const obj = { foo: ['bar'] }
      expect(Dot.get(obj, 'foo[0]')).toEqual('bar')
   })

   it('Should get a value in an array with a number', () => {
      const obj = { foo: [undefined, 'bar'] }
      expect(Dot.get(obj, 'foo.1')).toEqual('bar')
   })

   it('Should get a value in a nested object', () => {
      const obj = { foo: { bar: 'bar' } }
      expect(Dot.get(obj, 'foo.bar')).toEqual('bar')
   })

   it('Should return undefined when property does not exist', () => {
      const obj = { foo: 'bar' }
      expect(Dot.get(obj, 'bar')).toEqual(undefined)
   })

   it('Should return undefined when property does not exist in an array', () => {
      const obj = { foo: ['bar'] }
      expect(Dot.get(obj, 'foo[1]')).toEqual(undefined)
   })

   it('Should return a value in a array in a nested object', () => {
      const obj = { foo: { bar: ['bar'] } }
      expect(Dot.get(obj, 'foo.bar[0]')).toEqual('bar')
   })

   it('Should return a value  in a array of objects', () => {
      const obj = { foo: [{ bar: 'bar' }] }
      expect(Dot.get(obj, 'foo[0].bar')).toEqual('bar')
   })

   it('Should return a null  in a array of objects that the value is null', () => {
      const obj = { foo: [{ bar: null }] }
      expect(Dot.get(obj, 'foo[0].bar')).toEqual(null)
   })
})

describe('Dot isEmpty', () => {
   it('Should return true when object is empty', () => {
      expect(Dot.isEmpty({})).toEqual(true)
   })

   it('Should return false when object is not empty', () => {
      expect(Dot.isEmpty({ foo: 'bar' })).toEqual(false)
   })
})

describe('Dot replacePrimitivesInObject', () => {
   it('Should replace primitives in object', () => {
      const obj = { foo: 'bar' }
      const newObj = Dot.replacePrimitivesInObject(obj, 'baz')
      expect(newObj).toEqual({ foo: 'baz' })
   })

   it('Should replace primitives in object in array', () => {
      const obj = { foo: ['bar'] }
      const newObj = Dot.replacePrimitivesInObject(obj, 'baz')
      expect(newObj).toEqual({ foo: ['baz'] })
   })
})

describe('Dot clone', () => {
   it('Should clone an object', () => {
      const obj = { foo: 'bar' }
      const newObj = Dot.clone(obj)
      expect(newObj).toEqual(obj)
   })

   it('Should clone an object in array', () => {
      const obj = { foo: ['bar'] }
      const newObj = Dot.clone(obj)
      expect(newObj).toEqual(obj)
   })

   it('Should clone an object in nested object', () => {
      const obj = { foo: { bar: 'bar' } }
      const newObj = Dot.clone(obj)
      expect(newObj).toEqual(obj)
   })
})
