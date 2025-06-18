// Funzione per ottenere il cookie CSRF
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
    return cookieValue;
}

// Gestisce l'editing delle attività
document.querySelectorAll('.edit-task').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.task-card');

        const taskId = this.dataset.taskId;
        const descrizione = card.querySelector('.task-title').innerText;
        const tipo = this.dataset.tipo;
        const priorita = this.dataset.priorita;
        const form = document.getElementById('tabs');
        const currentPriorita = card.dataset.priorita;
        console.log('[MODIFICA] Priorità attuale letta dal DOM:', currentPriorita);
        if (form && typeof form.scrollIntoView === 'function') {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        document.getElementById('task_id').value = taskId;
        document.getElementById('descrizione').value = descrizione;
        document.getElementById('tipo').value = tipo;
        document.getElementById('priorita').value = currentPriorita;

        document.getElementById('form-button').innerText = "Salva Modifiche";
        editingTaskId = taskId;
        console.log('Task da modificare:', editingTaskId);
        
    });
});

// Gestisce il completamento delle attività
document.querySelectorAll('.complete-task').forEach(button => {
    button.addEventListener('click', function() {
        const taskId = this.dataset.taskId;
        console.log("ID completa:", taskId);

        fetch('complete_task/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: `task_id=${taskId}`
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                const taskCard = this.closest('.task-card');
                const completedTab = document.getElementById('completate');
                completedTab.appendChild(taskCard);
            } else {
                alert('Errore completando la task: ' + data.error);
            }
            window.location.reload();
        })
        .catch(error => alert('Errore di rete'));
    });
});

// Gestisce l'eliminazione delle attività
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", function () {
            const taskId = this.getAttribute("data-task-id");
            if (confirm("Sei sicuro di voler eliminare questa attività?")) {
                deleteTask(taskId);
            }
        });
    });
});

// Funzione per eliminare un'attività
function deleteTask(taskId) {
    fetch(`elimina_task/${taskId}/`, {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    })
    .then(response => {
        if (response.ok) {
            location.reload();
        } else {
            if(response.status == 403)
                alert("Non disponi delle autorizzazioni per eliminare la task");
            else
                alert("Non trovo questa task");
        }
    });
}
