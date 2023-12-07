export function getCurrentDate() {
  const currentDate = new Date()
  return currentDate.toISOString();
}

export function getCurrentTime(){
  const currDate = new Date()
  const currHour = currDate.getHours() > 9 ? currDate.getHours() :'0'+ currDate.getHours()
  const currMinute = currDate.getMinutes() > 9 ? currDate.getMinutes() : '0'+currDate.getMinutes();
  return `${currHour}:${currMinute}`
}