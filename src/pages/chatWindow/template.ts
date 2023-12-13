export const template = `
  <div class='usersBlock'>
            <div class='usersHeader'>
                <div class='profileSettings'>
                    {{{profileButton}}}
                    
                </div>
                <div class='chatSearch'>
                    {{{searchInput}}}
                </div>
            </div>
              {{{newChatButton}}}
              <div class='createChatContainer'>
                <input class='hide' id='addChat' type='text' placeholder='Enter chat name'/>
                <button class='hide' id='createChatButton'>create</button>
              </div>
            <div class='usersList' id='usersList'>
               {{{userItems}}}
            </div>
        </div>
        <div class='messageBlock'>
            <div class='messageHeader'>
                <div class='infoChat'>
                  <div class='chatName' id='chatName'></div>
                </div>
                <div>
                  <button class='hide' id='chatSettings'><img src='/cogwheelIcon.svg' alt='cogwheel'/></button>
                </div>
            </div>
            <div class='messageLine'>
                {{{messages}}}
            </div>
            <div>
                <form class='messageInput' id='{{ idForm }}'>
                    <img src='/clipIcon.svg' alt='clip'>
                    {{{messageInput}}}
                    {{{sendButton}}}
                </form>
            </div>
        </div>
`;
