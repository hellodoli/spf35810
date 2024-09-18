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

export function getDisplayDate(d: Date) {
  const dateDisplay = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  return dateDisplay
}
