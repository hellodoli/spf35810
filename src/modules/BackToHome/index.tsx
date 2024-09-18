import React from 'react'
import { useHistory } from 'react-router-dom'

import { routes } from 'utils/route-path'

const defaultText = 'Ooop! Không tìm thấy trang.'

const BackToHome = ({
  text = '',
  notFoundHub = false,
}: {
  text?: string
  notFoundHub?: boolean
}) => {
  const history = useHistory()

  const onClick = () => {
    if (notFoundHub) {
      history.push(routes.myHub)
      return
    }
    history.push(routes.home)
  }

  return (
    <div className="flex items-center justify-center w-full h-[100vh] overflow-hidden">
      <div className="inline-flex flex-col justify-center gap-4">
        <h2 className="text-2xl">{text || defaultText}</h2>
        <button
          className="stardust-button-reset stardust-button stardust-button--primary stardust-button--wide"
          onClick={onClick}
        >
          Back to {notFoundHub ? 'my Hub' : 'Home'}
        </button>
      </div>
    </div>
  )
}

export default BackToHome
