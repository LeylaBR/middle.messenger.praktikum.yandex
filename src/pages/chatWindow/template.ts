export const template = `
  <div class="usersBlock">
            <div class="usersHeader">
                <div class="profileSettings">
                    {{{profileButton}}}
                    <button class="buttonLink"><img src="/cogwheelIcon.svg" alt="cogwheel"/></button>
                </div>
                <div class="chatSearch">
                    {{{searchInput}}}
                </div>
            </div>
            <div class="usersList">
               {{{userItems}}}
            </div>
        </div>
        <div class="messageBlock">
            <div class="messageHeader">
                <div class="chatName">Рабочий чат</div>
                <div class="counterUsers">5</div>
            </div>
            <div class="messageLine">
                <div class="messageDate">26 октября</div>
                {{{messages}}}
            </div>
            <div>
                <form class="messageInput" id='{{ idForm }}'>
                    <img src="/clipIcon.svg" alt="clip">
                    {{{messageInput}}}
                    {{{sendButton}}}
                </form>
            </div>
        </div>
`;
