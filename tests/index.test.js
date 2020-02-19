const test = require('ava')
const { parseError } = require('../lib/index')

const fixtureStack = `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`

const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`

test('chrome error parse', t => {
  const error = new Error()
  error.stack = fixtureStack
  const parsed = parseError(error)
  t.truthy(parsed)
  t.is(parsed.message, 'TypeError: Error raised')
  t.is(parsed.stack.length, 4)
})

test('chrome error stack zero', t => {
  const error = new Error()
  t.is(parseError(error).stack.length, 0)
})

test('firefox error parse', t => {
  const error = new Error()
  error.stack = fixtureFirefoxStack
  const parsed = parseError(error)
  t.truthy(parsed)
  t.is(parsed.message, '')
  t.is(parsed.stack.length, 4)
})

test('firefox error stack zero', t => {
  const error = new Error()
  error.stack = `@debugger eval code:1:11
  `
  t.is(parseError(error).stack.length, 0)
})
