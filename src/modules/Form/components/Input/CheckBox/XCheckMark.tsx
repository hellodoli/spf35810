import React from 'react'

const styles = {
  fontSize: '.5rem',
  height: '1em',
  width: '1em',
  fill: 'currentcolor',
}

const XCheckMark = () => {
  return (
    <svg
      enableBackground={'new 0 0 12 12'}
      viewBox="0 0 12 12"
      x="0"
      y="0"
      className="bottom-0 left-0 right-0 top-0 absolute m-auto overflow-hidden inline-block text-color-primary"
      style={styles}
    >
      <g>
        <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
      </g>
    </svg>
  )
}

export default XCheckMark
