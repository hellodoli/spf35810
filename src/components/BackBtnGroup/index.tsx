import React from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import { isAddHubPathName } from 'utils/route-path'

const BackBtnGroup = () => {
  const location = useLocation()
  const history = useHistory()

  const handleAddHub = () => {
    history.replace('/add')
  }

  return (
    <div className="button-group flex items-stretch">
      <NavLink
        className="stardust-button-reset stardust-button stardust-button--primary"
        to="/"
      >
        <HomeIcon fill="#fff" width={16} height={16} />
      </NavLink>
      {isAddHubPathName(location.pathname) ? (
        <button
          className="stardust-button-reset stardust-button stardust-button--primary"
          onClick={() => history.replace('/my-hub')}
        >
          <span>Hub của tôi</span>
        </button>
      ) : (
        <button
          className="stardust-button-reset stardust-button stardust-button--primary flex items-center leading-normal"
          onClick={handleAddHub}
        >
          <PlusIcon fill="#fff" width={16} height={16} />
          <span className="ml-2">Thêm ca hub</span>
        </button>
      )}
    </div>
  )
}

export default BackBtnGroup
