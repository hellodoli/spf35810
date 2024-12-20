const DAYS = {
  VI: {
    '0': 'CN',
    '1': 'T2',
    '2': 'T3',
    '3': 'T4',
    '4': 'T5',
    '5': 'T6',
    '6': 'T7',
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

function getDateHourTime(timeString: string) {
  const time = new Date(`2024-01-01 ${timeString}`)
  time.setSeconds(0)
  time.setSeconds(0)
  return time
}

function getUnixTime(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const hubTime = d.getTime()
  return hubTime
}

function getDisplayDate(d: Date, isIncludeDay = false) {
  let dateDisplay = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  if (isIncludeDay) {
    const dIndex = `${d.getDay()}` as keyof (typeof DAYS)['VI']
    dateDisplay = `${DAYS['VI'][dIndex]}, ${dateDisplay}`
  }
  return dateDisplay
}

export { getDateHourTime, getDisplayDate, getUnixTime }
