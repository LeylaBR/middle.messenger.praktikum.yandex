export const validationForm = (name, value) => {
  switch (name) {
    case 'first_name':
    case 'second_name':
      const regexName = /^[А-ЯЁA-Z][а-яёa-z\-]*$/;
      return regexName.test(value);

    case 'login':
      const regexLogin = /^[a-zA-Z](?!.*?[0-9]{5,})[a-zA-Z0-9_-]{2,19}$/;
      return regexLogin.test(value);

    case 'email':
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regexEmail.test(value);

    case 'password':
      const regexPassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
      return regexPassword.test(value);

    case 'phone':
      const regexPhone = /^\+?\d{10,15}$/;
      return regexPhone.test(value);

    case 'message':
      return Boolean(value);

    default:
      return true;
  }

  return true;
};
