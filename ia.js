const apiKey = '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'; 

const url = 'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct/v1/chat/completions';

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
};

const data = {
    model: "Qwen/Qwen2.5-Coder-32B-Instruct",
    messages: [
        {
            role: "user",
            content: ""
        }
    ],
    max_tokens: 500,
    stream: false
};








document.getElementById('mas-informacion').addEventListener('click', () => {
    alert('¡Gracias por tu interés! Pronto tendrás más información.');
  });

  document.getElementById('transi').addEventListener('click', function () {
    this.classList.add('explode-animation');
    // Elimina la clase después de que la animación termine para poder reproducirla nuevamente
    setTimeout(() => {
      this.classList.remove('explode-animation');
    }, 500); // Tiempo de duración de la animación (en ms)
  });

  


  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const chatContainer = document.getElementById('chatContainer');
  const chatWindow = document.getElementById('chatWindow');
  const minimizeBtn = document.getElementById('minimizeBtn');

  let isMinimized = false; // Estado de la ventana (minimizada o no)

  // Función para enviar mensajes
  function sendMessage() {
      const userMessage = chatInput.value.trim(); // Captura el mensaje del usuario
      if (userMessage === '') return; // No hacer nada si el mensaje está vacío

      // Mostrar el mensaje del usuario
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add( 'text-green-600', 'p-1','rounded-lg', 'right-0' ,);
      userMessageElement.innerHTML = `<p class=" bg-gray-200 w-full h-30 p-2 rounded-lg text-left ">${userMessage}</p>`;
      chatMessages.appendChild(userMessageElement);

      // Limpiar el campo de entrada
      chatInput.value = '';

      // Simular respuesta del chatbot con lógica básica
      setTimeout(async () => {
          const botMessage = await getBotResponse(userMessage);
          const botMessageElement = document.createElement('div');
          botMessageElement.classList.add('text-left', 'text-gray-700', 'p-2');
          botMessageElement.innerHTML = `<p class="  p-2 rounded-lg w-full bg-green-200 text-green-700 text-left">${botMessage}</p>`;
          chatMessages.appendChild(botMessageElement);
          
          // Desplazar hacia abajo para mostrar el último mensaje
          chatMessages.scrollTop = chatMessages.scrollHeight;
      });

      // Desplazar hacia abajo para mostrar el último mensaje inmediatamente
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Función para obtener la respuesta del bot basada en el mensaje del usuario
async  function getBotResponse(userMessage) {
      userMessage = userMessage.toLowerCase(); // Convertir a minúsculas para facilitar la comparación

      const botResponse = await fetchData(userMessage)
      // Respuesta por defecto si el bot no entiende el mensaje
      return botResponse;
  }

  // Escuchar el evento 'Enter' para enviar el mensaje
  chatInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          sendMessage();
      }
  });

  // Función para minimizar/restaurar la ventana del chat
  minimizeBtn.addEventListener('click', () => {
      isMinimized = !isMinimized;

      if (isMinimized) {
          chatContainer.classList.add('minimized'); // Minimiza la ventana
          minimizeBtn.innerHTML = '<i class="fa-solid fa-plus text-white"></i>'; // Cambiar el icono a "+"
      } else {
          chatContainer.classList.remove('minimized'); // Restaura la ventana
          minimizeBtn.innerHTML = '<i class="fa-solid fa-down-left-and-up-right-to-center text-white"></i>'; // Cambiar el icono a "-"
      }
  });




async function fetchData(question) {
    let result = null;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-Coder-32B-Instruct",
                messages: [
                    {
                        role: "user",
                        content: question
                    }
                ],
                max_tokens: 500,
                stream: false
            })
        });

     result = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

    return result.choices[0].message.content;
}

