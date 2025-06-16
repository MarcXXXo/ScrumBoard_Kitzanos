// Attendere che il documento sia completamente caricato
document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task-card');
    const priorityContainers = document.querySelectorAll('.priority');

    // Rendi ogni task draggable e gestisci eventi di drag
    tasks.forEach(task => {
        task.setAttribute('draggable', true);

        task.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.dataset.taskId); // Imposta l'ID della task
            e.dataTransfer.effectAllowed = 'move';
            task.classList.add('dragging'); // Aggiungi classe per stilizzazione
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging'); // Rimuovi classe al termine del drag
        });
    });

    // Gestisci il drop nei contenitori di priorità
    priorityContainers.forEach(container => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permetti il drop
            e.dataTransfer.dropEffect = 'move';
            container.classList.add('drag-over'); // Aggiungi classe per stilizzazione
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over'); // Rimuovi classe quando esce
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.classList.remove('drag-over');
            const taskId = e.dataTransfer.getData('text/plain'); // Ottieni l'ID della task
            const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
            if (taskCard) {
                container.querySelector('.task-list').appendChild(taskCard); // Aggiungi la task al contenitore
                const newPriority = container.dataset.priorityCode; // Ottieni il nuovo codice di priorità
                updateTaskPriority(taskId, newPriority); // Aggiorna la priorità nel backend
            }
        });
    });
});

// Funzione per aggiornare la priorità della task nel backend
function updateTaskPriority(taskId, newPriority) {
    fetch('update_priority/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Ottieni il token CSRF
        },
        body: JSON.stringify({ task_id: taskId, priorita: newPriority }), // Invia i dati
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert('Errore nel salvare la nuova priorità: ' + (data.error || 'errore sconosciuto'));
        }
    })
    .catch(() => alert('Errore di rete durante l\'aggiornamento')); // Gestisci errori di rete
}

// Funzione per ottenere il valore di un cookie specifico
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue; // Restituisci il valore del cookie
}
