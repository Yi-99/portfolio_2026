import assert from 'node:assert/strict'
import test from 'node:test'

let getProjectCardClassName, resolveProjectMedia, setProjectMediaPlaybackState

try {
  ({ getProjectCardClassName, resolveProjectMedia, setProjectMediaPlaybackState } = await import('../src/components/projectMedia.js'))
} catch (error) {
  assert.fail(`Project media resolver is unavailable: ${error.message}`)
}

test('local project video takes precedence over a static thumbnail', () => {
  const media = resolveProjectMedia({
    title: 'Halda AI',
    localVideo: '/halda-ai-demo.mp4',
    poster: '/halda-ai-demo-poster.jpg',
    videoOrientation: 'portrait',
    thumb: '/halda-ai-thumb.png',
  })

  assert.deepEqual(media, {
    kind: 'native-video',
    src: '/halda-ai-demo.mp4',
    poster: '/halda-ai-demo-poster.jpg',
    orientation: 'portrait',
  })
})

test('local project video defaults to landscape presentation', () => {
  const media = resolveProjectMedia({
    title: 'Nimbus Quote',
    localVideo: '/nimbus-quote-demo.mp4',
  })

  assert.deepEqual(media, {
    kind: 'native-video',
    src: '/nimbus-quote-demo.mp4',
    poster: undefined,
    orientation: 'landscape',
  })
})

test('portrait playback does not create a sticky expansion after the pointer leaves', () => {
  const classes = new Set(['card', 'star-enter', 'card--portrait-media', 'is-in'])
  const card = {
    classList: {
      toggle(name, enabled) {
        if (enabled) classes.add(name)
        else classes.delete(name)
      },
    },
  }

  setProjectMediaPlaybackState(card, { orientation: 'portrait' }, true)
  assert.deepEqual([...classes], ['card', 'star-enter', 'card--portrait-media', 'is-in', 'is-media-playing'])

  setProjectMediaPlaybackState(card, { orientation: 'portrait' }, false)
  assert.deepEqual([...classes], ['card', 'star-enter', 'card--portrait-media', 'is-in'])
  assert.equal(getProjectCardClassName({ orientation: 'portrait' }), 'card star-enter card--portrait-media')
})
