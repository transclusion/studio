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

export function openPopup (url, features, onClose) {
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
      if (onClose) onClose()
    }
  }, 100)

  const handleMessage = evt => {
    if (evt.source.name === url) {
      if (evt.data.type === 'close') {
        clearInterval(intervalId)
        if (onClose) onClose()
        win.close()
        window.removeEventListener('message', handleMessage)
      }
    }
  }

  window.addEventListener('message', handleMessage)
}

export function openCenteredPopup (url, size, onClose) {
  const screen = window.screen

  const centerX = screen.width - size.width
  const centerY = screen.height - size.height

  const top = centerY > 0 ? centerY / 2 : 0
  const left = centerX > 0 ? centerX / 2 : 0

  return openPopup(url, {height: size.height, width: size.width, top, left}, onClose)
}
