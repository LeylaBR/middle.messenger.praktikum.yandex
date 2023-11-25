export const template = `
<span class='content'>
    <h3 class="title">Авторизация</h3>
    <form class="form" id="{{ idForm }}">
        <div class="inputs">
           {{{authInputs}}}
        </div>
        <div class="buttons">
            {{{loginButton}}}
            {{{registrationButton}}}
        </div>
    </form>
</span>
`;
