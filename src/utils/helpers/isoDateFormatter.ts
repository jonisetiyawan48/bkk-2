export function isoToString(currDate:string){
  const date = new Date(currDate)
  return date.toLocaleString('id-ID', {  day: 'numeric',month: 'long',year: 'numeric',});
}