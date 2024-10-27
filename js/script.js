// quando os elementos da pág carregar
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const messageInput = document.getElementById('messageInput');
    const addMessageBtn = document.getElementById('addMessageBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const messagesContainer = document.getElementById('messagesContainer');

    // Função para sanitizar a entrada do usuário
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.innerText = input; // Escapa caracteres especiais
        return div.innerHTML;
    }

    // Função para atualizar as mensagens exibidas
    function updateMessages() {
        // Recupera as mensagens do localStorage ou cria um array vazio
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messagesContainer.innerHTML = ''; // Limpa o contêiner de mensagens

        // Cria elementos para cada mensagem(itera array)
        messages.forEach((message, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `
                <span>${message}</span>
                <button class="deleteBtn">Apagar</button>
            `;
            // Adiciona o evento de clique ao botão "Apagar"
            messageDiv.querySelector('.deleteBtn').addEventListener('click', () => deleteMessage(index));
            messagesContainer.appendChild(messageDiv); // Adiciona a mensagem ao contêiner
        });
    }

    // Função para atualizar a contagem de caracteres
    function updateSpanCount() {
        const length = messageInput.value.length; // Obtém o comprimento do texto
        document.getElementById('count').textContent = `${length}/500`; // Atualiza o contador na tela
    }
    // Adiciona um ouvinte de evento para monitorar a entrada
    messageInput.addEventListener('input', updateSpanCount);

    // Adiciona uma nova mensagem
    addMessageBtn.addEventListener('click', () => {
        const message = sanitizeInput(messageInput.value.trim()); // Obter a entrada e sanitizá-la
        if (message.length > 500) {
            alert('A mensagem deve ter no máximo 500 caracteres.');
            return;
        }

        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        if (messages.length >= 50) {
            alert('Você atingiu o limite máximo de mensagens.');
            return;
        }
        if (message) {
            messages.push(message); // Adiciona a nova mensagem ao array
            localStorage.setItem('messages', JSON.stringify(messages)); // Atualiza o localStorage
            messageInput.value = ''; // Limpa o input da pág.
            updateMessages();
        }
    });

    // Limpa todas as mensagens
    clearAllBtn.addEventListener('click', () => {
        localStorage.removeItem('messages'); // Remove todas as mensagens do localStorage
        updateMessages(); // Atualiza a exibição
    });

    // Deletar mensagem individual
    window.deleteMessage = (index) => {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.splice(index, 1); // Remove a mensagem com o índice especificado
        localStorage.setItem('messages', JSON.stringify(messages)); // Atualiza o localStorage
        updateMessages();
    };

    // Atualiza a lista de mensagens ao carregar a página
    updateMessages();
});

