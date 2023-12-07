export function ValidateJobtitle(value:string){
  let error;
  if(!value){
    error= 'Job Title is required'
  }
  return error;
}

export function ValidateDate(value:string){
  let error;
  if(!value){
    error= 'Date is required'
  }
  return error;
}

export function ValidateCondition(value:string){
  let error;
  if(!value){
    error= 'Condition is required'
  }
  return error;
}

export function ValidateDescription(value:string){
  let error;
  if(!value){
    error= 'Description is required'
  }
  return error;
}
export function ValidateName(value:string){
  let error;
  if(!value){
    error= 'Name is required'
  }
  return error;
}