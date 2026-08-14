export function resolveProjectMedia(project) {
  if (project.localVideo) {
    return {
      kind: 'native-video',
      src: project.localVideo,
      poster: project.poster,
      orientation: project.videoOrientation || 'landscape',
    }
  }

  if (project.video) {
    return { kind: 'youtube', id: project.video }
  }

  if (project.loom) {
    return { kind: 'loom', id: project.loom }
  }

  if (project.thumb) {
    return { kind: 'image', src: project.thumb }
  }

  return { kind: 'glyph', glyph: project.glyph }
}

export function getProjectCardClassName(media) {
  const classes = ['card', 'star-enter']

  if (media.orientation === 'portrait') {
    classes.push('card--portrait-media')
  }

  return classes.join(' ')
}

export function setProjectMediaPlaybackState(card, media, isPlaying) {
  if (!card || media.orientation !== 'portrait') return
  card.classList.toggle('is-media-playing', isPlaying)
}
