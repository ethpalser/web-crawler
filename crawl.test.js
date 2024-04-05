const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('https://www.google.com/ normalize to www.google.com', () => {
    expect(normalizeURL('https://www.google.com/')).toBe('www.google.com')
})

test('https://www.google.com normalize to www.google.com', () => {
    expect(normalizeURL('https://www.google.com/')).toBe('www.google.com')
})

test('http://www.google.com/ normalize to www.google.com', () => {
    expect(normalizeURL('https://www.google.com/')).toBe('www.google.com')
})

test('http://www.google.com normalize to www.google.com', () => {
    expect(normalizeURL('https://www.google.com/')).toBe('www.google.com')
})

test('www.google.com normalize to www.google.com', () => {
    expect(normalizeURL('https://www.google.com/')).toBe('www.google.com')
})

test('https://www.google.com/account normalize to www.google.com/account', () => {
    expect(normalizeURL('https://www.google.com/account')).toBe('www.google.com/account')
})

test('https://www.google.com/account?sort=name normalize to www.google.com/account', () => {
    expect(normalizeURL('https://www.google.com/account?sort=name')).toBe('www.google.com/account')
})

test('emailto:www.google.com normalize to www.google.com', () => {
    expect(normalizeURL('emailto:www.google.com')).toBe('www.google.com')
})

test('google.com normalize to www.google.com', () => {
    expect(() => normalizeURL('google.com')).toThrow('Invalid URL')
})