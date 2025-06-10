document.querySelectorAll('.edit-task').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.task-card');

        const taskId = this.dataset.taskId;
        const descrizione = card.querySelector('.task-title').innerText;
        const tipo = this.dataset.tipo;
        const priorita = this.dataset.priorita;

        // Riempie i campi del form
        document.getElementById('task_id').value = taskId;
        document.getElementById('descrizione').value = descrizione;
        document.getElementById('tipo').value = tipo;
        document.getElementById('priorita').value = priorita;

        // Cambia il testo del bottone
        document.getElementById('form-button').innerText = "Salva Modifiche";
        editingTaskId = taskId;
        console.log('Task da modificare:', editingTaskId);
        document.getElementById('task-edit-id-display').innerText = 'Modificando task ID: ' + editingTaskId;
    });
});

document.querySelectorAll('.complete-task').forEach(button => {
  button.addEventListener('click', function() {
    const taskId = this.dataset.taskId;
    console.log("ID completa:", taskId);
    fetch('complete_task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': getCookie('csrftoken'), // Funzione per il CSRF token
      },
      body: `task_id=${taskId}`
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        // Sposta la card nel tab completate
        const taskCard = this.closest('.task-card');
        const completedTab = document.getElementById('completate'); // id tab completate
        completedTab.appendChild(taskCard);
        // Eventualmente cambia stile o rimuovi pulsante completa
        //this.remove();
        //const editIcon = document.getElementsByClassName(".edit-task");
        //editIcon.remove();
      } else {
        alert('Errore completando la task: ' + data.error);
      }
      window.location.reload();
    })

    .catch(error => alert('Errore di rete'));
  });
});

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

function deleteTask(taskId) {
  fetch(`elimina_task/${taskId}/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie1("csrftoken")
    }
  })
    .then(response => {
      if (response.ok) {
        location.reload();  // Ricarica la pagina per aggiornare la lista
      } else {
        alert("Errore durante l'eliminazione della task.");
      }
    });
}

// Funzione per leggere il token CSRF dai cookie
function getCookie1(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Cerchiamo il nome
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


// Funzione per prendere il cookie csrf
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
