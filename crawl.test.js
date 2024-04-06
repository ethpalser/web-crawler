const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

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

test('html without <a> tag will get no urls', () => {
    expect(getURLsFromHTML('<!DOCTYPE html><p>Hello World</p>')).toBe([])
})

test('html with one <a> tag will get one url', () => {
    expect(getURLsFromHTML('<!DOCTYPE html><a href="https://www.google.com/">To Google</a>')).toBe(['https://www.google.com'])
})

test('html with two <a> tag will get two urls', () => {
    expect(getURLsFromHTML('<!DOCTYPE html>'
    + '<a href="https://www.google.com">To Google</a>'
    + '<a href="https://www.amazon.com/">To Amazon</a>)'))
    .toBe(['https://www.google.com', 'https://www.amazon.com/'])
})

test('html with two relative URLs at https://www.google.com/ will get two urls', () => {
    expect(getURLsFromHTML('<!DOCTYPE html>'
    + '<a href="/account">To Google Account</a>'
    + '<a href="/support">To Google Support</a>)'))
    .toBe(['https://www.google.com/account', 'https://www.google.com/support'])
})