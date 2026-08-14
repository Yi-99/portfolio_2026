import assert from 'node:assert/strict'
import test from 'node:test'

let getActiveSection

try {
  ({ getActiveSection } = await import('../src/navState.js'))
} catch (error) {
  assert.fail(`Nav-state helper is unavailable: ${error.message}`)
}

const sections = [
  { id: 'about', offsetTop: 700 },
  { id: 'studio', offsetTop: 1400 },
  { id: 'work', offsetTop: 2100 },
]

test('no nav section is active before the first section reaches the scroll threshold', () => {
  assert.equal(getActiveSection(sections, 0, 1000), null)
})

test('the latest section above the scroll threshold becomes active', () => {
  assert.equal(getActiveSection(sections, 1100, 1000), 'studio')
})
