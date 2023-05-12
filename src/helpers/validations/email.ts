const emailValidator = (email: string) => {
  const errors = [];
  if (!email) {
    errors.push('Email required');
  }
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  if (!email.toLowerCase().match(regex)) {
    errors.push('Email must be valid');
  }
  return errors;
};

export default emailValidator;
