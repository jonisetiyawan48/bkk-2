export function ValidateName(value: string) {
  let error;
  if (!value) {
    error = 'Name is required';
  }
  return error;
}

export function ValidateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Email is required';
  }
  return error;
}

export function ValidateRoles(value: string) {
  let error;
  if (!value) {
    error = 'Roles is required';
  }
  return error;
}

export function ValidatePassword(value: string) {
  let error;
  if (!value) {
    error = 'Password is required';
  } else if (value.length < 6) {
    error = 'Password must be longer than 6';
  }
  return error;
}

export function validateConfirmPassword(pass: string, value: string) {
  let error;
  if (!value) {
    error = 'Confirmation password is required';
  } else if (pass && value) {
    if (pass !== value) {
      error = 'Password not matched';
    }
  }
  return error;
}
