import { Button, Input, Layout } from '../../components/index';
import { registrationInputsData } from './constants';
import Registration from './Registation';
import { inputEventListeners, submitForm } from '../../utils/form';
import { formIds, routes } from '../../constants';

const registrationInputs = registrationInputsData.map((inputData) => {
    const { className, type, placeholder, name, value, required } = inputData;
    return new Input('div', {
        attr: {
            class: 'inputContainer',
        },
        className,
        type,
        placeholder,
        name,
        id: name,
        value,
        required,
        events: {
            click: (event) => {
                inputEventListeners(event.target);
            },
        },
    });
});

const loginButton = new Button('button', {
    attr: {
        class: 'button',
    },
    label: 'Login',
    events: {
        click: (event) => {
            event.preventDefault();
            window.location.href = routes.auth;
        },
    },
});

const registrationButton = new Button('button', {
    attr: {
        class: 'button',
    },
    label: 'Registration',
    events: {
        click: (event) => {
            event.preventDefault();
            const form = document.getElementById(formIds.registration);
            submitForm(form);
        },
    },
});

const registration = new Registration('main', {
    attr: {
        class: 'page',
    },
    idForm: formIds.registration,
    registrationInputs,
    loginButton,
    registrationButton,
});

export const registrationPage = new Layout('div', {
    attr: {
        class: 'wrapper',
    },
    children: registration,
});
