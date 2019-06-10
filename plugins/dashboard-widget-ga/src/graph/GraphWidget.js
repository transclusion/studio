import {scaleLinear, scaleTime} from 'd3-scale'
import parseDate from 'date-fns/parse'
import React from 'react'
import styles from './GraphWidget.css'

function parseDimension (value, type) {
  switch (type) {
    case 'ga:date':
      return parseDate(value, 'YYYYMMDD')
    default:
      throw new Error(`Unknown dimension type: ${type}`)
  }
}

function parseMetric (value, header) {
  switch (header.type) {
    case 'INTEGER':
      return parseInt(value, 10)
    default:
      throw new Error(`Unknown metric header type: ${header.type}`)
  }
}

function getDimensionScale (type, values, range) {
  switch (type) {
    case 'ga:date':
      return scaleTime()
        .domain([values[0], values[values.length - 1]])
        .range(range)
    case 'ga:userType':
      return 0
    default:
      throw new Error(`Unknown dimension type: ${type}`)
  }
}

function getMetricsScale (header, values, range) {
  switch (header.type) {
    case 'INTEGER':
      return scaleLinear()
        .domain([0, Math.max(...values)])
        .range(range)
    default:
      throw new Error(`Unknown metrics header type: ${header.type}`)
  }
}

function lineToPathDescription (line) {
  return line.reduce((d, p, idx) => {
    if (idx === 0) return `M ${p[0]} ${p[1]} `
    return `${d}L ${p[0]} ${p[1]} `
  }, '')
}

function Graph ({columnHeader, data, width, height}) {
  const xRange = [0, width]
  const yRange = [height, 0]

  const rows = data.rows.map(row => {
    return {
      dimensions: row.dimensions.map((d, idx) => parseDimension(d, columnHeader.dimensions[idx])),
      metrics: row.metrics[0].values.map((value, idx) => {
        return parseMetric(value, columnHeader.metricHeader.metricHeaderEntries[idx])
      })
    }
  })

  const scales = {
    dimensions: columnHeader.dimensions.map((d, idx) => {
      const values = rows.map(r => r.dimensions[idx])
      return getDimensionScale(d, values, xRange)
    }),
    metrics: columnHeader.metricHeader.metricHeaderEntries.map((h, idx) => {
      return getMetricsScale(h, rows.map(row => row.metrics[idx]), yRange)
    })
  }

  const lines = columnHeader.metricHeader.metricHeaderEntries.map((_, metricIdx) => {
    return rows.map((row, rowIdx) => {
      return [
        scales.dimensions[0](row.dimensions[0]),
        scales.metrics[metricIdx](row.metrics[metricIdx])
      ]
    })
  })

  return (
    <div>
      <svg width={width} height={height}>
        {lines.map((line, idx) => (
          <path key={String(idx)} d={lineToPathDescription(line)} />
        ))}
      </svg>
    </div>
  )
}

function GraphWidget (props) {
  const width = props.contentRect && props.contentRect.width
  const height = 200
  const showGraph = props.reports && width

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>GraphWidget</h2>
      </header>

      <div className={styles.content} ref={props.setContentElement}>
        {showGraph && <Graph {...props.reports[0]} width={width} height={height} />}
      </div>
    </div>
  )
}

export default GraphWidget
