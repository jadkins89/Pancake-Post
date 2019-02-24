const socket = io.connect(window.location.href);

const chats_element = document.getElementById('chats');
const chat_input_element = document.getElementById('chat-input');
const forum_element = document.getElementById('forum');


socket.on('chat', function (data) {
    add_chat(data['from'], data['msg']);
});

chat_input_element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && chat_input_element.value) {
        socket.emit('chat', {msg: chat_input_element.value.substring(0, 120)});
        chat_input_element.value = '';
    }
});

function add_chat(from, chat) {
    const chat_element = document.createElement('div');
    chat_element.innerHTML = '<b>' + from + '</b>: ' + chat;
    chats_element.appendChild(chat_element);
    chats_element.scrollTop = chats_element.scrollHeight;
}