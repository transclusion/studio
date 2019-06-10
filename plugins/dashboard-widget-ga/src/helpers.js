const DEFAULT_FEATURES = [
  'scrollbars=yes',
  'toolbar=no',
  'location=yes',
  'titlebar=yes',
  'directories=no',
  'status=yes',
  'menubar=no'
]

function toFeatureStr (features) {
  return Object.keys(features).map(key => `${key}=${features[key]}`)
}

export function openPopup (url, features, onMessage) {
  const win = window.open(
    // note: we need to start with about:blank here as MS Edge will throw
    // when attempting to call .focus() or .moveTo() on a window with an untrusted origin
    'about:blank',
    '_blank',
    DEFAULT_FEATURES.concat(features ? toFeatureStr(features) : []).join(',')
  )

  win.name = url
  win.focus()
  win.location.href = url

  const intervalId = setInterval(() => {
    if (win.closed) {
      clearInterval(intervalId)
      window.removeEventListener('message', handleMessage)
    }
  }, 100)

  const handleMessage = evt => {
    if (evt.source.name === url) {
      clearInterval(intervalId)
      if (onMessage) onMessage(evt.data)
      win.close()
      window.removeEventListener('message', handleMessage)
    }
  }

  window.addEventListener('message', handleMessage)
}

export function openCenteredPopup (url, size, onMessage) {
  const screen = window.screen
  const centerX = screen.width - size.width
  const centerY = screen.height - size.height
  const top = centerY > 0 ? centerY / 2 : 0
  const left = centerX > 0 ? centerX / 2 : 0

  return openPopup(url, {height: size.height, width: size.width, top, left}, onMessage)
}
