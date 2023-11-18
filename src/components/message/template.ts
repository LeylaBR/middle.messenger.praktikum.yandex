export const template = `
{{#if left}}
    <div class="messageContainer">
{{/if}}
{{#if right}}
    <div class="messageContainer messageContainerRight">
{{/if}}
{{#if left}}
    {{{avatar}}}
{{/if}}
    <div>
        {{#if left}}
            <div class="nameUser">{{name}}</div>
        {{/if}}
        <div class="{{className}}">
            <div class="messageText">{{text}}</div>
            <div class="messageTime">{{time}}</div>
        </div>
    </div>
{{#if right}}
    {{{avatar}}}
{{/if}}
{{#if left}}
    </div>
{{/if}}
{{#if right}}
    </div>
{{/if}}`;
