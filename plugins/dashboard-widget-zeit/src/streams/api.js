import {combineLatest, from, of} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'

export function getAPIResource$ (url, tokens) {
  if (!tokens.data) return of({data: null})

  return from(
    window
      .fetch(url, {
        headers: {
          Authorization: `${tokens.data.token_type} ${tokens.data.access_token}`
        }
      })
      .then(res => res.json())
      .then(data => ({data}))
      .catch(err => ({error: {message: err.message}}))
  )
}

export function getDeployments$ (tokens$, params$) {
  return combineLatest(tokens$, params$).pipe(
    switchMap(([tokens, params]) => {
      const search = `projectId=${params.projectId}&teamId=${params.teamId}&limit=5`
      return getAPIResource$(`https://api.zeit.co/v4/now/deployments?${search}`, tokens).pipe(
        map(({data, error}) => ({
          error,
          data: data ? data.deployments : null
        }))
      )
    })
  )
}
