const nameValidator = (name: string) => {
  const errors = [];
  if (!name) {
    errors.push('User name required');
  }
  if (name.length < 2 || name.length > 60) {
    errors.push('User name, should be 2-60 characters');
  }
  return errors;
};

export default nameValidator;
