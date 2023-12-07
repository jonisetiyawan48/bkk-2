function ValidatePassword(value:string) {
  let error
  if (!value) {
    error = 'password is required'
  } else if (value.length < 6) {
    error = "password must be longer than 6"
  }
  return error
}

export default ValidatePassword