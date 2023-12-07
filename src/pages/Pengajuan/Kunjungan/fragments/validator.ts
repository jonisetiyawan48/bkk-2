export function ValidateAgency(value:string){
  let error;
  if(!value){
    error = 'Agency is required'
  }
  return error
}

export function ValidateDate(value:string){
  let error;
  if(!value){
    error = 'Date is required'
  }
  return error
}

export function ValidateIn(value:string) {
  let error;
  if(!value){
    error = 'Time In is required'
  }
  return error
}

export function ValidateOut(value:string){
  let error;
  if(!value){
    error = 'Time Out is required'
  }
  return error
}

export function ValidateTeachers(value:number){
  let error;
  if(!value){
    error = 'Number of teachers is required'
  }
  return error
}

export function ValidateStudents(value:number){
  let error;
  if(!value){
    error = 'Number of students is required'
  }
  return error
}