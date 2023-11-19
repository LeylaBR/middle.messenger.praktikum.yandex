import { validationForm } from './validation';
import { emptyFieldText, incorrectValueText } from '../constants';

const addError = (el, textError) => {
    const errorElement = document.getElementById(`error_${el.name}`);
    el.classList.add('errorValidation');
    errorElement.classList.remove('hide');
    errorElement.classList.add('error');
    errorElement.textContent = textError;
};

const removeError = (el) => {
    const errorElement = document.getElementById(`error_${el.name}`);

    el.classList.remove('errorValidation');
    errorElement.classList.remove('error');
    errorElement.classList.add('hide');
};

const fieldValidationCheck = (element, value) => {
    if (element.name === 'message' && !value) {
        element.classList.add('errorValidation');
        return;
    }

    if (value || !element.required) {
        const valid = validationForm(element.name, value);
        if (!valid) {
            addError(element, incorrectValueText);
        } else {
            removeError(element);
        }
    } else {
        addError(element, emptyFieldText);
    }
};

export const inputEventListeners = (element) => {
    element.addEventListener('blur', (e) => {
        if (!Boolean(e.target.value) && !element.required) {
            return;
        }
        fieldValidationCheck(element, e.target.value);
    });

    element.addEventListener('input', (e) => {
        fieldValidationCheck(element, e.target.value);
    });
};

export const submitForm = (form) => {
    const inputs = form.querySelectorAll('input');

    let formData = {};

    for (let i = 0; i < inputs.length; i + 1) {
        let element = inputs[i];

        fieldValidationCheck(element, element.value);
        const errors = form.querySelectorAll('.error');
        if (!errors.length) {
            formData[element.name] = element.value;
        }
    }

    console.log(formData);
};
