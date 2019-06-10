import format from 'date-fns/format'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import differenceInHours from 'date-fns/difference_in_hours'
import differenceInDays from 'date-fns/difference_in_days'
import differenceInWeeks from 'date-fns/difference_in_weeks'
import differenceInMonths from 'date-fns/difference_in_months'
import differenceInYears from 'date-fns/difference_in_years'
import React from 'react'
import styles from './ZEITWidget.css'
import {openCenteredPopup} from './helpers'

function dateFormat (d) {
  const now = Date.now()
  const diffSeconds = differenceInSeconds(now, d)
  const diffMins = differenceInMinutes(now, d)
  const diffHours = differenceInHours(now, d)
  const diffDays = differenceInDays(now, d)
  const diffWeeks = differenceInWeeks(now, d)
  const diffMonths = differenceInMonths(now, d)
  const diffYears = differenceInYears(now, d)

  if (diffMonths || diffYears) return format(d, 'MMMM D, YYYY, HH:mm')
  if (diffWeeks) return `${diffWeeks}w`
  if (diffDays) return `${diffDays}d`
  if (diffHours) return `${diffHours}h`
  if (diffMins) return `${diffMins}m`
  if (diffSeconds) return `${diffMins}s`

  // if (diffSeconds === 0)

  // console.log({
  //   diffMins,
  //   diffHours,
  //   diffDays,
  //   diffWeeks,
  //   diffMonths
  //   // diffYears
  // })

  return format(d, 'MMMM D, YYYY, HH:mm')
}

function ZEITWidget (props) {
  const onOpenPopup = evt => {
    evt.preventDefault()
    openCenteredPopup(evt.target.href, {width: 600, height: 620}, props.onMessage)
  }

  if (props.isLoading) {
    return <div>Loading...</div>
  }

  if (!props.isLoggedIn) {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h3 className={styles.title}>ZEIT</h3>
          <a href={props.signinUrl} target='_blank' onClick={onOpenPopup}>
            Sign in
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>Deployments</h3>
        <p>
          A list of deployments in <strong>web</strong>
        </p>

        {props.user && <div>Signed in as {props.user.name || props.user.email}</div>}

        <a href={props.signoutUrl} target='_blank' onClick={onOpenPopup}>
          Sign out
        </a>
      </div>

      <div className={styles.content}>
        {props.deployments && (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {props.deployments.map(d => (
                <tr key={d.uid}>
                  <td>{d.url}</td>
                  <td>{d.state}</td>
                  <td>{dateFormat(d.created)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ZEITWidget
