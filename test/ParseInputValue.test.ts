import { parseInputValue } from './../src/ParseInputValue'
describe('parseInputValue', () => {
   it('Should parse a number', () => {
      const value = parseInputValue({ target: { type: 'number', value: '1' } })
      expect(value).toEqual(1)
   })

   it('Should parse a range', () => {
      const value = parseInputValue({ target: { type: 'range', value: '1' } })
      expect(value).toEqual(1)
   })

   it('Should parse a checkbox', () => {
      const value = parseInputValue({
         target: { type: 'checkbox', checked: true }
      })
      expect(value).toEqual(true)
   })

   it('Should parse a string', () => {
      const value = parseInputValue({ target: { value: 'foo' } })
      expect(value).toEqual('foo')
   })
})
