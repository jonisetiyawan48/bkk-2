export function ValidateVisitDate(value:string) {
  let error;
  if(!value){
    error = 'Visit Date is Required'
  }
  return error;
}

export function ValidateNecessity(value:string) {
  let error;
  if(!value) {
    error = 'Necessity is required'
  }
  return error;
}

export function ValidateTeacher(value:number){
  let error;
  if(!value) {
    error = 'Teachers are required'
  } 
  return error;
}

export function ValidateIn(value:string) {
  let error;
  if(!value){
    error = 'Time In is required'
  }
  return error;
}

export function ValidateOut(value:string) {
  let error;
  if(!value){
    error = 'Time Out is required'
  }
  return error;
}