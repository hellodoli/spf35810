import React from 'react'
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'

import { ReactComponent as AnglesDownIcon } from 'assets/icons/angles-down.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import ModifyHubBtn from 'components/ModifyHubBtn'
import { ELE_CLASSNAMES } from 'modules/Form/constants'
import { FORM_ACTION } from 'modules/Form/types/enum'
import { isAddHubPathName, isFormHubPathName } from 'utils/route-path'

const BackBtnGroup = ({
  type = FORM_ACTION.ADD,
  hubId = '',
}: {
  type?: FORM_ACTION
  hubId?: string
}) => {
  const history = useHistory()
  const { path } = useRouteMatch()

  const handleAddHub = () => {
    history.replace('/add')
  }

  const scrollToView = () => {
    const hubPreview = document.querySelector(`.${ELE_CLASSNAMES.HUB_PREVIEW}`)
    if (!hubPreview) {
      const toggleHubPreviewBtn = document.querySelector(
        `.${ELE_CLASSNAMES.TOGGLE_HUB_PREVIEW_BUTTON}`,
      )
      if (toggleHubPreviewBtn) toggleHubPreviewBtn.scrollIntoView()
    } else hubPreview.scrollIntoView()
  }

  return (
    <div className="button-group flex items-stretch">
      <NavLink
        className="stardust-button-reset stardust-button stardust-button--primary"
        to="/"
      >
        <HomeIcon fill="var(--nc-primary-bg)" width={16} height={16} />
      </NavLink>
      {isAddHubPathName(path) ? (
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
          <PlusIcon fill="var(--nc-primary-bg)" width={16} height={16} />
          <span className="ml-2">Thêm ca hub</span>
        </button>
      )}
      {isFormHubPathName(path) && (
        <>
          <ModifyHubBtn
            formType={type}
            hubId={hubId}
            iconMode={true}
            className="!ml-auto lg:hidden"
          />
          <button
            className={clsx(
              'stardust-button-reset stardust-button stardust-button--secondary',
              'lg:hidden',
            )}
            onClick={scrollToView}
          >
            <AnglesDownIcon fill="var(--nc-primary)" width={16} height={16} />
          </button>
        </>
      )}
    </div>
  )
}

export default BackBtnGroup
