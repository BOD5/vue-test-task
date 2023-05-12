const phoneValidator = (phone: string) => {
  const errors = [];
  if (!phone) {
    errors.push('Phone required');
  }
  const regex = /^\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/; //eslint-disable-line
  if (!phone.toLowerCase().match(regex)) {
    errors.push('Phone must be valid');
  }
  return errors;
};

export default phoneValidator;
