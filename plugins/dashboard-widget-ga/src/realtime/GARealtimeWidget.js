import React from "react";
import styles from "./GARealtimeWidget.css";
import { openCenteredPopup } from "./helpers";

const COLUMN_TITLES = {
  "rt:userType": "User Type",
  "rt:deviceCategory": "Device Category",
  "rt:activeUsers": "Active Users"
};

const ROW_VALUES = {
  NEW: "new",
  RETURNING: "returning",
  MOBILE: "mobile",
  DESKTOP: "desktop"
};

function GARealtimeWidget(props) {
  const onSigninClick = evt => {
    evt.preventDefault();
    openCenteredPopup(
      evt.target.href,
      { width: 600, height: 620 },
      props.onSigninClose
    );
  };

  if (props.isLoading) {
    return <div>Loading...</div>;
  }

  if (!props.isLoggedIn) {
    return (
      <div>
        <a href={props.signinUrl} target="_blank" onClick={onSigninClick}>
          Sign in
        </a>
      </div>
    );
  }

  const headers = props.report && props.report.columnHeaders;
  const rows = props.report && props.report.rows;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>Realtime analytics</h3>
      </div>

      {props.report && (
        <div className={styles.content}>
          <div>Total active users: {props.report.activeUsers}</div>

          {headers && rows && (
            <>
              <h4>Break-down</h4>
              <table>
                <thead>
                  <tr>
                    {headers.map((h, idx) => (
                      <th key={String(idx)}>
                        {COLUMN_TITLES[h.name] || h.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={String(idx)}>
                      {r.map(v => (
                        <td key={headers[idx].name}>{ROW_VALUES[v] || v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GARealtimeWidget;
