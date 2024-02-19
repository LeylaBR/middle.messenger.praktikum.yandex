import { formIds } from '../../constants';
import { loginButton, registrationButton, registrationInputs } from './index';
import Registration from './Registation';
import { expect } from 'chai';
import { validationForm } from '../../utils/validation';

describe('Registration Page', () => {
  it('Валидация поля и показ ошибки', async () => {
    const registrationPage = await new Registration('div', {
      attr: {
        class: 'page',
      },
      idForm: formIds.registration,
      registrationInputs,
      loginButton,
      registrationButton,
    });

    const component = await registrationPage.getContent()!;
    const loginInput = component?.querySelector('#login') as HTMLInputElement;
    const regButton = component?.querySelector(
      '.button:nth-child(2)'
    ) as HTMLButtonElement;
    const errorLogin = component?.querySelector(
      '#error_login'
    ) as HTMLSpanElement;
    if (loginInput) {
      loginInput.value = '21';
    }
    regButton.addEventListener('click', () => {
      const res = validationForm('login', loginInput.value);
      if (!res) {
        errorLogin.textContent = 'Login should be 3 to 20 characters long';
      }
    });
    if (regButton) {
      regButton.click();
    }

    const textError = errorLogin.textContent;
    expect(textError).to.eql('Login should be 3 to 20 characters long');
  });
});
