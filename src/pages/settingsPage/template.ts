export const template = `
 <h3 class='title'>Настройка профиля</h3>
        <form class='form' id='{{ idForm }}'>
            <div class='avatarSettings'>
                {{{avatar}}}
                <div class='input__wrapper'>
                        {{{fileButton}}}
                </div>
            </div>
            <div class='inputs'>
                {{{settingsInputs}}}
            </div>
            <div class='buttons'>
               {{{cancelButton}}}
               {{{saveButton}}}
            </div>
            <div>
            {{{logoutButton}}}
            </div>
        </form>
`;
