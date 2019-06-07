import { createEventHandler } from "react-props-stream";
import { combineLatest, from, of, timer } from "rxjs";
import {
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";

const POLL_FREQUENCY = 20000; // every 20 seconds

function getTokens$(tokensUrl$, loadEvent$) {
  return combineLatest(tokensUrl$, loadEvent$).pipe(
    switchMap(([tokensUrl]) =>
      from(
        fetch(tokensUrl, { credentials: "include" })
          .then(res => res.json())
          .then(data => ({ data }))
          .catch(err => ({ error: { message: err.message } }))
      )
    ),
    publishReplay(1),
    refCount()
  );
}

function getReport$(tokens$, profileId$) {
  const poll$ = timer(0, POLL_FREQUENCY);

  return combineLatest(tokens$, profileId$, poll$).pipe(
    switchMap(([tokens, profileId]) => {
      if (!tokens.data) return of({ data: null });
      const dimensions = ["rt:userType", "rt:deviceCategory"];
      const metrics = ["rt:activeUsers"];
      return from(
        fetch(
          `https://www.googleapis.com/analytics/v3/data/realtime?ids=${profileId}&metrics=${metrics.join(
            ","
          )}&dimensions=${dimensions.join(",")}`,
          {
            headers: {
              Authorization: `${tokens.data.token_type} ${
                tokens.data.access_token
              }`
            }
          }
        )
          .then(res => res.json())
          .then(data => {
            return {
              data: {
                columnHeaders: data.columnHeaders,
                rows: data.rows,
                activeUsers: data.totalsForAllResults["rt:activeUsers"]
              }
            };
          })
          .catch(err => {
            return { error: { message: err.message } };
          })
      );
    })
  );
}

export function toPropsStream(props$) {
  const [signinClose$, onSigninClose] = createEventHandler();
  const profileId$ = props$.pipe(
    map(props => props.profileId),
    distinctUntilChanged()
  );
  const tokensUrl$ = props$.pipe(
    map(props => props.tokensUrl),
    distinctUntilChanged()
  );
  const tokens$ = getTokens$(tokensUrl$, signinClose$.pipe(startWith(null)));
  const report$ = getReport$(tokens$, profileId$);

  return combineLatest(props$, tokens$, report$).pipe(
    map(([props, tokens, report]) => {
      return {
        errors: [tokens.error, report.error].filter(Boolean),
        isLoggedIn: Boolean(tokens.data),
        onSigninClose: () => onSigninClose(null),
        report: report.data,
        signinUrl: props.signinUrl
      };
    }),
    startWith({
      isLoading: true
    })
  );
}
