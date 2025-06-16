// Funzione per inizializzare le tab
function initTabs() {
  // Seleziona tutti gli elementi con classe 'tab'
  const tabs = document.querySelectorAll('.tab');
  // Seleziona tutti gli elementi con classe 'tab-content'
  const contents = document.querySelectorAll('.tab-content');

  // Aggiunge un event listener di click a ciascuna tab (fatto in modo che si possano aggiungere altre tabs )
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Rimuove la classe 'active' da tutte le tab
      tabs.forEach(t => t.classList.remove('active'));
      // Aggiunge la classe 'active' alla tab cliccata
      tab.classList.add('active');

      const tabId = tab.getAttribute('data-tab');
      // Rimuove la classe 'active' da tutti gli elementi con classe 'tab-content'
      contents.forEach(c => c.classList.remove('active'));

      const contentToShow = document.getElementById(tabId);
      // Se il contenuto esiste, aggiunge la classe 'active' per renderlo visibile
      if (contentToShow) {
        contentToShow.classList.add('active');
      } else {
        // Erroe se l'elemento con l'id specificato non è stato trovato
        console.warn(`Task con id ${tabId} non trovata.`);
      }
    });
  });
}

// Inizializza le tab quando il DOM è completamente carico
document.addEventListener('DOMContentLoaded', initTabs);
