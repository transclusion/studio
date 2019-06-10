import {createEventHandler} from 'react-props-stream'
import {from, merge} from 'rxjs'
import {filter, map, publishReplay, refCount, switchMap} from 'rxjs/operators'
import {getAPIResource$} from './api'

const [message$, onMessage] = createEventHandler()
export {message$, onMessage}

const signin$ = message$.pipe(filter(msg => msg.type === 'signin'))
const signout$ = message$.pipe(filter(msg => msg.type === 'signout'))

const tokens$ = merge(
  signin$.pipe(map(msg => msg.tokens || null)),
  signout$.pipe(map(() => null))
).pipe(
  publishReplay(1),
  refCount()
)

export function getTokens$ (tokensUrl$) {
  const initialTokens$ = tokensUrl$.pipe(
    switchMap(tokensUrl => {
      return from(
        window
          .fetch(tokensUrl)
          .then(res => res.json())
          .then(data => ({data}))
          .catch(err => ({error: {message: err.message}}))
      )
    }),
    publishReplay(1),
    refCount()
  )

  return merge(initialTokens$, tokens$.pipe(map(tokens => ({data: tokens}))))
}

export function getUser$ (tokens$) {
  return tokens$.pipe(
    switchMap(tokens => {
      return getAPIResource$('https://api.zeit.co/www/user', tokens).pipe(
        map(({data, error}) => ({
          error,
          data: data ? data.user : null
        }))
      )
    })
  )
}
