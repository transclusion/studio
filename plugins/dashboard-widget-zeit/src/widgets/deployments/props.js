import {combineLatest} from 'rxjs'
import {distinctUntilChanged, map, startWith} from 'rxjs/operators'
import {getDeployments$} from '../../streams/api'
import {getTokens$, getUser$, onMessage} from '../../streams/user'

export function toPropsStream (props$) {
  const params$ = props$.pipe(
    map(props => ({
      projectId: props.projectId,
      teamId: props.teamId
    })),
    distinctUntilChanged()
  )
  const tokensUrl$ = props$.pipe(
    map(props => props.tokensUrl),
    distinctUntilChanged()
  )
  const tokens$ = getTokens$(tokensUrl$)
  const user$ = getUser$(tokens$)
  const deployments$ = getDeployments$(tokens$, params$)

  return combineLatest(props$, tokens$, user$, deployments$).pipe(
    map(([props, tokens, user, deployments]) => {
      return {
        deployments: deployments.data,
        errors: [tokens.error, user.error, deployments.error].filter(Boolean),
        isLoggedIn: Boolean(tokens.data),
        onMessage,
        signinUrl: props.signinUrl,
        signoutUrl: props.signoutUrl,
        user: user.data
      }
    }),
    startWith({
      isLoading: true
    })
  )
}
