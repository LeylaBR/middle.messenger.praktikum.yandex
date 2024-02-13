export const showError = (message: string) => {
  const errorWindow = document.getElementById('errorWindow') as HTMLElement;

  errorWindow.classList.remove('errorWindowHide');
  errorWindow.classList.add('errorWindowShow');
  errorWindow.textContent = message;

  setTimeout(() => {
    errorWindow.classList.add('errorWindowHide');
    errorWindow.classList.remove('errorWindowShow');
  }, 6000);
};
