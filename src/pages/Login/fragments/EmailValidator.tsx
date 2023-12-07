function ValidateEmail(value: string) {
  let error;
  if (!value) {
    error = 'email is required';
  }
  return error;
}

export default ValidateEmail;
