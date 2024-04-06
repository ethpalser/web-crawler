const { test, expect } = require('@jest/globals')
const { sortObjectKeysByValue } = require('./report.js')

test('sort object keys by value from ascending to descending order', () => {
    const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    }
    expect(sortObjectKeysByValue(obj, false)).toStrictEqual(['d', 'c', 'b', 'a'])
})

test('sort object keys by value from no order to ascending order', () => {
    const obj = {
        a: 7,
        b: 23,
        c: 3,
        d: 79
    }
    expect(sortObjectKeysByValue(obj, true)).toStrictEqual(['c', 'a', 'b', 'd'])
})

test('sort object keys by value from no order to descending order', () => {
    const obj = {
        a: 7,
        b: 23,
        c: 3,
        d: 79
    }
    expect(sortObjectKeysByValue(obj, false)).toStrictEqual(['d', 'b', 'a', 'c'])
})