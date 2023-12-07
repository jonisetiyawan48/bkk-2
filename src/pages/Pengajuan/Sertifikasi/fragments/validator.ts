export function ValidateNisn(value: string) {
  let error;
  if (!value) {
    error = 'nisn is required';
  }
  return error;
}

export function ValidatePhone(value: string) {
  let error;
  if (!/^[0-9]+$/.test(value)) {
    error = 'only numbers required';
  }
  if (!value) {
    error = 'phone is required';
  }

  return error;
}

export function ValidateDate(value: string) {
  let error;
  if (!value) {
    error = 'date is required';
  }
  return error;
}

export function ValidateProgram(value: string) {
  let error;
  if (!value) {
    error = 'program is required';
  }
  return error;
}

export function ValidateSchool(value: string) {
  let error;
  if (!value) {
    error = 'school is required';
  }
  return error;
}

export function ValidateGender(value: string) {
  let error;
  if (!value) {
    error = 'gender is required';
  }
  return error;
}

export function ValidateStatus(value: string) {
  let error;
  if (!value) {
    error = 'Status is required';
  }
  return error;
}
