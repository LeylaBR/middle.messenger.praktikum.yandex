export const template = `
 <h3 class='title'>Настройка чата</h3>
         <div class='avatarSettings'>
                {{{avatar}}}
                <div class='input__wrapper'>
                        {{{fileButton}}}
                </div>
         </div>
         {{{searchInput}}}
          {{{searchSelect}}}
          <div id='userName'></div>
          {{{newMemberButton}}}
          <div class='usersBlockSettings'>
            {{{userItems}}}
          </div>
          {{{backButton}}}
`;
