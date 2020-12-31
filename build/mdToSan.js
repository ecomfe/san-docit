// convert markdown to san component
module.exports = function (content) {
    return `
        <template>
            <div class="content">${content}</div>
        </template>
    `;
}
