document.querySelectorAll('.edit-task').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.task-card');

        const taskId = this.dataset.taskId;
        const descrizione = card.querySelector('.task-title').innerText;
        const tipo = this.dataset.tipo;
        const priorita = this.dataset.priorita;
        const form = document.getElementById('tabs');
        if (form && typeof form.scrollIntoView === 'function') {
          form.scrollIntoView({ behavior: 'smooth', block: 'start'  });
        }


        // Riempie i campi del form
        document.getElementById('task_id').value = taskId;
        document.getElementById('descrizione').value = descrizione;
        document.getElementById('tipo').value = tipo;
        document.getElementById('priorita').value = priorita;
        
        
        // Cambia il testo del bottone
        document.getElementById('form-button').innerText = "Salva Modifiche";
        editingTaskId = taskId;
        console.log('Task da modificare:', editingTaskId);
        
        //document.getElementById('task-edit-id-display').innerText = 'Modificando task ID: ' + editingTaskId;
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
      "X-CSRFToken": getCookie("csrftoken")
    }
  })
    .then(response => {
      if (response.ok) {
        location.reload();  // Ricarica la pagina per aggiornare la lista
      } else {
          if(response.status == 403)
            alert("Non disponi delle autorizzazioni per eliminare la task");
          else{
            alert("Non trovo questa task");
          }
      }
    });
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

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("filterToggle");
  const toggle_comp = document.getElementById("filterToggle_comp");
  const menu = document.getElementById("filterMenu");
  const menu_comp = document.getElementById("filterMenu_comp");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", (!expanded).toString());
    const expanded_comp = toggle_comp.getAttribute("aria-expanded") === "true";
    toggle_comp.setAttribute("aria-expanded", (!expanded_comp).toString());
  });

  // Chiude il menu se clicchi fuori
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
    if (!menu_comp.contains(e.target) && !toggle_comp.contains(e.target)) {
      menu_comp.classList.remove("show");
      toggle_comp.setAttribute("aria-expanded", "false");
    }
  });
  const searchInput = document.getElementById("task-search");
  const tipoFilter = document.getElementById("filter-tipo");
  const prioritaFilter = document.getElementById("filter-priorita");
  const utenteFilter = document.getElementById("filter-utente"); // opzionale
  //console.log("Filtro attivo:", { descrizione, tipo, priorita });
  const searchInput_comp = document.getElementById("task-search_comp");
  const tipoFilter_comp = document.getElementById("filter-tipo_comp");
  const prioritaFilter_comp = document.getElementById("filter-priorita_comp");
  const utenteFilter_comp = document.getElementById("filter-utente_comp");

  const taskCards = document.querySelectorAll(".task-card");

  function filtraTask() {
    const search = searchInput.value.toLowerCase();
    const tipo = tipoFilter.value;
    const priorita = prioritaFilter.value;
    const utente = utenteFilter?.value || "";
    const search_comp = searchInput_comp.value.toLowerCase();
    const tipo_comp = tipoFilter_comp.value;
    const priorita_comp = prioritaFilter_comp.value;
    const utente_comp = utenteFilter_comp?.value || "";

    taskCards.forEach(card => {
      const descrizione = card.querySelector(".task-title")?.innerText.toLowerCase() || "";
      const tipoText = card.querySelector(".task-type")?.innerText || "";
      const prioritaContainer = card.closest(".priority");
      const hasPriorita = prioritaContainer?.classList?.contains(prioritaToClass(priorita));

      const creatore = card.querySelector(".task-creator")?.innerText || "";

      const matchSearch = descrizione.includes(search) || tipoText.toLowerCase().includes(search) || creatore.toLowerCase().includes(search);
      const matchTipo = tipo === "" || tipoText.includes(tipo);
      const matchPriorita = priorita === "" || hasPriorita;
      const matchUtente = utente === "" || creatore === utente;

      const visible = matchSearch && matchTipo && matchPriorita && matchUtente;
      //console.log({ descrizione, tipo, creatore, visible });
      card.style.display = visible ? "block" : "none";
    });
  }

  function prioritaToClass(code) {
    return {
      UI: "urgent-important",
      IN: "important-not-urgent",
      UN: "urgent-not-important",
      NN: "not-urgent-not-important"
    }[code] || "";
  }

  searchInput.addEventListener("input", filtraTask);
  tipoFilter.addEventListener("change", filtraTask);
  prioritaFilter.addEventListener("change", filtraTask);
  if (utenteFilter) utenteFilter.addEventListener("change", filtraTask);
  searchInput_comp.addEventListener("input", filtraTask);
  tipoFilter_comp.addEventListener("change", filtraTask);
  prioritaFilter_comp.addEventListener("change", filtraTask);
  if (utenteFilter) utenteFilter_comp.addEventListener("change", filtraTask);
});




