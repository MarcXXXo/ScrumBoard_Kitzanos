document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("toast-container");
    if (!container) {
        console.error("Toast container non trovato");
        return;
    }

    function createToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast " + message.level;  // usa la classe livello per styling
        toast.textContent = message.text;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    // Qui leggi i messaggi dal JSON nel DOM, non da window.djangoMessages
    const messageScript = document.getElementById('django-messages');
    if (messageScript) {
        let messageData = [];
        try {
            messageData = JSON.parse(messageScript.textContent || '[]');
        } catch (e) {
            console.error("Errore parsing messaggi JSON:", e);
        }
        messageData.forEach(createToast);
    }
});