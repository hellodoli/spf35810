const DAYS = {
  VI: {
    '0': 'Chủ nhật',
    '1': 'Thứ hai',
    '2': 'Thứ ba',
    '3': 'Thứ tư',
    '4': 'Thứ năm',
    '5': 'Thứ sáu',
    '6': 'Thứ bảy',
  },
  EN: {
    '0': 'Sun',
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat',
  },
}

export function getDateHourTime(timeString: string) {
  const time = new Date(`2024-01-01 ${timeString}`)
  time.setSeconds(0)
  time.setSeconds(0)
  return time
}

export function getUnixTime(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const hubTime = d.getTime()
  return hubTime
}

export function getDisplayDate(d: Date, isIncludeDay = false) {
  let dateDisplay = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  if (isIncludeDay) {
    const dIndex = `${d.getDay()}` as keyof (typeof DAYS)['VI']
    dateDisplay = `${DAYS['VI'][dIndex]}, ${dateDisplay}`
  }
  return dateDisplay
}
