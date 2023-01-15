const validation = (data) => {
  let errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is not valid";
  }
  if (!data.phone) {
    errors.phone = "Number is requird";
  }
  return errors;
};

export default validation;
