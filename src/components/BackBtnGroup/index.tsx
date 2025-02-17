import React from 'react'
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'

import { ReactComponent as AngleDownIcon } from 'assets/icons/angle-down.svg'
import { ReactComponent as AnglesDownIcon } from 'assets/icons/angles-down.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import ModifyHubBtn from 'components/Buttons/ModifyHubBtn'
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

  const scrollToView = ({
    blockSelector = '',
    backupSelector = '',
    scrollBlock = 'start',
    scrollInline = 'nearest',
    scrollBehavior,
  }: {
    blockSelector?: string
    backupSelector?: string
    scrollBlock?: ScrollLogicalPosition
    scrollInline?: ScrollLogicalPosition
    scrollBehavior?: ScrollBehavior
  }) => {
    const options = {
      block: scrollBlock,
      inline: scrollInline,
      ...(scrollBehavior && {
        behavior: scrollBehavior,
      }),
    }
    const block = document.querySelector(blockSelector)
    if (!block) {
      if (!backupSelector) return
      const backupBlock = document.querySelector(backupSelector)
      if (backupBlock) backupBlock.scrollIntoView(options)
    } else block.scrollIntoView(options)
  }

  const scrollToPreviewBlock = () => {
    scrollToView({
      blockSelector: `.${ELE_CLASSNAMES.HUB_PREVIEW}`,
      backupSelector: `.${ELE_CLASSNAMES.TOGGLE_HUB_PREVIEW_BUTTON}`,
    })
  }

  const scrollToExtraBlock = () => {
    scrollToView({
      blockSelector: `.${ELE_CLASSNAMES.HUB_EXTRA_INCOME}`,
      scrollBlock: 'center',
    })
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
            onClick={scrollToExtraBlock}
          >
            <AngleDownIcon fill="var(--nc-primary)" width={16} height={16} />
          </button>
          <button
            className={clsx(
              'stardust-button-reset stardust-button stardust-button--secondary',
              'lg:hidden',
            )}
            onClick={scrollToPreviewBlock}
          >
            <AnglesDownIcon fill="var(--nc-primary)" width={16} height={16} />
          </button>
        </>
      )}
    </div>
  )
}

export default BackBtnGroup
