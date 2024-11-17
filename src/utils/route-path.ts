export const routes = {
  home: '/',
  cal: '/cal',
  add: '/add',
  hub: '/hub',
  detailHub: '/hub/:id',
  myHub: '/my-hub',
  notFoundHub: '/notfound-hub',
  setting: '/setting',
}

export const isCalPathName = (pathname: string = '') => {
  return (
    pathname === routes.cal ||
    pathname === `${routes.cal}/` ||
    pathname === `/${routes.cal}`
  )
}

export const isAddHubPathName = (pathname: string = '') => {
  return (
    pathname === routes.add ||
    pathname === `${routes.add}/` ||
    pathname === `/${routes.add}`
  )
}
