import assert from 'node:assert/strict'
import test from 'node:test'

let shouldRemainRevealed

try {
  ({ shouldRemainRevealed } = await import('../src/revealState.js'))
} catch (error) {
  assert.fail(`Reveal-state helper is unavailable: ${error.message}`)
}

test('a revealed card stays visible after resizing changes its intersection ratio', () => {
  assert.equal(shouldRemainRevealed(false, true), true)
  assert.equal(shouldRemainRevealed(true, false), true)
})
