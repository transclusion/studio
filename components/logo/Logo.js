import React from 'react'

function Logo () {
  return (
    <div style={{margin: '-0.5em 0'}}>
      <svg
        viewBox='0 0 512 512'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{height: '2em'}}
      >
        <mask
          id='mask0'
          mask-type='alpha'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='512'
          height='512'
        >
          <rect width='512' height='512' rx='256' />
        </mask>
        <g mask='url(#mask0)'>
          <rect width='512' height='512' fill='#166DF9' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M533.333 10.6667L501.333 -21.3333L-21.3334 501.333L10.6666 533.333L256 288L501.333 533.333L533.333 501.333L288 256L533.333 10.6667Z'
            fill='#73FFCD'
          />
        </g>
      </svg>
    </div>
  )
}

export default Logo
