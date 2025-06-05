document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const addButton = document.querySelector('.add-button');
  const descriptionInput = document.querySelector('input[type="text"]');
  const typeSelect = document.querySelectorAll('select')[0];      // primo select = tipo attività
  const categorySelect = document.querySelectorAll('select')[1];  // secondo select = priorità

  // Cambio tab lato UI (placeholder alert per ora)
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Aggiunta attività
  addButton.addEventListener('click', () => {
    const desc = descriptionInput.value.trim();
    if (!desc) {
      alert('Inserisci la descrizione dell\'attività');
      return;
    }

    const priority = categorySelect.value;
    const type = typeSelect.value;

    const priorityMap = {
      'Urgente e Importante': 'urgent-important',
      'Importante Non Urgente': 'important-not-urgent',
      'Urgente Non Importante': 'urgent-not-important',
      'Non Urgente Non Importante': 'not-urgent-not-important'
    };

    const containerClass = priorityMap[priority];
    const container = document.querySelector(`.${containerClass} .task-list`);

    const li = document.createElement('li');
    li.textContent = `${type}: ${desc}`;
    li.setAttribute('data-type', type.toLowerCase());

    container.appendChild(li);

    descriptionInput.value = '';
  });
});