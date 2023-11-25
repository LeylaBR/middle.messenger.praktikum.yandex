export const template = `
 <h3 class="title">Настройка профиля</h3>
        <form class="form" id='{{ idForm }}'>
            <div class="avatarSettings">
                {{{avatar}}}
                <div class="input__wrapper">
                    <label class="button">
                        <span>Выберите файл</span>
                    </label>
                </div>
            </div>
            <div class="inputs">
                {{{settingsInputs}}}
            </div>
            <div class="buttons">
               {{{cancelButton}}}
               {{{saveButton}}}
            </div>
        </form>
`;
