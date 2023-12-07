export function ValidateAlignmentDate(value:string) {
  let error;
  if(!value){
    error = 'Tanggal is Required'
  }
  return error;
}

export function ValidateSubject(value:string) {
  let error;
  if(!value) {
    error = 'Subject is required'
  }
  return error;
}

export function ValidateAgencyName(value:number){
  let error;
  if(!value) {
    error = 'Nama Agency is required'
  } 
  return error;
}

export function ValidateLocation(value:number){
  let error;
  if(!value) {
    error = 'Lokasi is required'
  } 
  return error;
}