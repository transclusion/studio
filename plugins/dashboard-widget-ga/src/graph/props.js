import {createEventHandler} from 'react-props-stream'
import {BehaviorSubject, combineLatest, from, of, timer} from 'rxjs'
import {
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap
} from 'rxjs/operators'

const POLL_FREQUENCY = 1000 * 60 * 60 // every 1 hour

function getTokens$ (tokensUrl$, loadEvent$) {
  return combineLatest(tokensUrl$, loadEvent$).pipe(
    switchMap(([tokensUrl]) =>
      from(
        window
          .fetch(tokensUrl, {credentials: 'include'})
          .then(res => res.json())
          .then(data => ({data}))
          .catch(err => ({error: {message: err.message}}))
      )
    ),
    publishReplay(1),
    refCount()
  )
}

function getReports$ (tokens$, profileId$) {
  const poll$ = timer(0, POLL_FREQUENCY)

  return combineLatest(tokens$, profileId$, poll$).pipe(
    switchMap(([tokens, profileId]) => {
      if (!tokens.data) return of({data: null})
      return from(
        window
          .fetch(`https://analyticsreporting.googleapis.com/v4/reports:batchGet`, {
            method: 'POST',
            headers: {
              Authorization: `${tokens.data.token_type} ${tokens.data.access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              reportRequests: [
                {
                  viewId: profileId,
                  dateRanges: [{startDate: '28daysAgo', endDate: 'yesterday'}],
                  metrics: [
                    {
                      expression: 'ga:users'
                    },
                    {
                      expression: 'ga:pageviews'
                    }
                  ],
                  dimensions: [
                    {
                      name: 'ga:date'
                    }
                  ]
                }
              ]
            })
          })
          .then(res => res.json())
          .then(data => ({data: data.reports}))
          .catch(err => ({error: {message: err.message}}))
      )
    })
  )
}

function getElementRect$ () {
  const subject = new BehaviorSubject({})
  let el

  const handleResize = () => {
    subject.next(el.getBoundingClientRect())
  }

  const setElement = newEl => {
    el = newEl
    if (el) {
      handleResize()
      window.addEventListener('resize', handleResize)
    } else {
      window.removeEventListener('resize', handleResize)
    }
  }

  return {rect$: subject.asObservable(), setElement}
}

export function toPropsStream (props$) {
  const [reloadEvent$, onReload] = createEventHandler()
  const profileId$ = props$.pipe(
    map(props => props.profileId),
    distinctUntilChanged()
  )
  const tokensUrl$ = props$.pipe(
    map(props => props.tokensUrl),
    distinctUntilChanged()
  )
  const loadEvent$ = reloadEvent$.pipe(startWith(null))
  const tokens$ = getTokens$(tokensUrl$, loadEvent$)
  const reports$ = getReports$(tokens$, profileId$)
  const {rect$: contentRect$, setElement: setContentElement} = getElementRect$()

  return combineLatest(props$, tokens$, reports$, contentRect$).pipe(
    map(([props, tokens, reports, contentRect]) => {
      return {
        contentRect,
        errors: [tokens.error, reports.error].filter(Boolean),
        isLoggedIn: Boolean(tokens.data),
        onReload: () => onReload(null),
        reports: reports.data,
        setContentElement,
        signinUrl: props.signinUrl,
        signoutUrl: props.signoutUrl
      }
    }),
    startWith({
      isLoading: true
    })
  )
}
