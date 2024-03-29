import { validationForm } from './validation';
import { emptyFieldText, errorFieldText } from '../constants';

const addError = (el: HTMLInputElement, textError?: string) => {
  const errorElement: HTMLElement = document.getElementById(
    `error_${el.name}`
  ) as HTMLElement;
  if (errorElement && textError) {
    el.classList.add('errorValidation');
    errorElement.classList.remove('hide');
    errorElement.classList.add('error');
    errorElement.textContent = textError;
  }
};

const removeError = (el: HTMLInputElement) => {
  const errorElement: HTMLElement = document.getElementById(
    `error_${el.name}`
  ) as HTMLElement;
  if (errorElement) {
    el.classList.remove('errorValidation');
    errorElement.classList.remove('error');
    errorElement.classList.add('hide');
  }
};

const fieldValidationCheck = (element: HTMLInputElement, value: string) => {
  if (element.name === 'message' && !value) {
    element.classList.add('errorValidation');
    return;
  }

  if (value || !element.required) {
    const valid = validationForm(element.name, value);
    if (!valid && element.name) {
      const fieldName: string = element.name;
      addError(element, errorFieldText[fieldName]);
    } else {
      removeError(element);
    }
  } else {
    addError(element, emptyFieldText);
  }
};

export const inputEventListeners = (element: HTMLInputElement) => {
  element.addEventListener('blur', (e: FocusEvent) => {
    if (!Boolean((e.target as HTMLInputElement).value) && !element.required) {
      return;
    }
    fieldValidationCheck(element, (e.target as HTMLInputElement).value);
  });

  element.addEventListener('input', (e: Event) => {
    fieldValidationCheck(element, (e.target as HTMLInputElement).value);
  });
};

export const submitForm = (form: HTMLElement) => {
  const inputs = form.querySelectorAll('input');
  let errors: NodeListOf<Element> | [] = [];

  let formData: any = {};

  inputs.forEach((input) => {
    let element: HTMLInputElement = input;
    const errorsList = form.querySelectorAll('.error');
    errors = errorsList;
    fieldValidationCheck(element, element.value);

    if (!errors.length && element && !!element.name) {
      formData[element.name] = element.value;
    }
  });
  if (!errors.length) {
    return formData;
  }
  return {};
};
